
let bcrypt = require('bcrypt')
const {validationResult}=require('express-validator')
const db = require("../../database/models")
const { Op } = require("sequelize");

const userController = {
    registroForm: (req, res)=>{
        
        res.render("./users/registro")
    },

    loginForm: (req, res)=>{
        res.render("./users/ingreso")
    },

    add: function (req, res) {
        const errors=validationResult(req)
        //Si no hay errores creamos un nuevo usuario 
        //de lo contrario volvemos al formulario con los errores para el usuario

        if(errors.isEmpty()){
            //res.send(req.body)
            
        /*creamos un objeto con los datos recibidos del formulario y una dónde 
        guardar la imágen si es que se mandó una, sino dejamos una default*/
        let newUser = req.body

        console.log('req.body')
        console.log(newUser)

        let img = "/images/usuarios/default.png"
        if(req.file){
            img = "/images/usuarios/" +req.file.filename
        }
        newUser.img = img
 
        //creamos un id para el usuario
        newUser.id = Date.now()
        console.log(newUser.id)
        /////////////////////////////////////////////////
        //añadir verificaciones de express validator//
        /////////////////////////////////////////////////

        //verificar que ambas contraseñas sean iguales
        if(req.body.password === req.body.password2){
            let password = req.body.password

            //solo necesitamos una así que borramos la segunda que venía en el formulario
            delete newUser.password2

            //hasheamos la contraseña y la guardamos en nuestro objeto que se va a ir a la base de datos
            newUser.password = bcrypt.hashSync(password, 10)

            //estos son los ids que tenemos en nustra tabla de users_roles
            let roleId
            if(newUser.profile == "seller"){
                roleId = 5
            }else{
                roleId = 6
            }
            //En el formulario ya no obtenemos la edad si no la fecha de nacimiento y hay
            // que hacer el calculo de la edad
            let yearPresent= new Date()
            let year=newUser.release_date.slice(0,4)
            newUser.age=yearPresent.getFullYear()-Number(year)
           
            //guardar en el disco, creamos un registro para la tabla de users y otro para la de users_info
            db.User.create({
                id: newUser.id,
                email: newUser.email,
                pass: newUser.password,
                user_role_id: roleId, //5 seller, 6 user
                active: true,
            })
            .then(function(user){
                db.UserInfo.create({
                    user_id: newUser.id,
                    first_name: newUser.nameF,
                    last_name: newUser.apellido,
                    age: newUser.age,
                    profile_img: newUser.img
                })
            })
            .then(()=>{
               return res.redirect('/users/login')
            })
            //.catch() //falta definir que hacer en caso de error

            /* Redirige al login */
            
        }else{
            res.render('users/registro', {passwordError: 'las contraseñas deben de ser iguales'})
        }
            } 
            else{
                //Hay errores y regresamos al formulario con los errores
               // console.log(errors)
                //console.log(req.body)
                res.render('users/registro',{errors:errors.mapped(),old:req.body})

            }
    },
    login: function (req, res) {
        // verificar si el correo está en la base de datos
        return db.User.findOne({
            where: {
                email: req.body.email,
                active: 1
            },
            include: [
                {association: 'user_info'},
                {association: 'role'}
            ]
        })
        .then(function(user){  //la variable "user" ya trae los campos de user y user_info
            
            if(user){
                /* Si existe, entonces compara las contraseñas*/
                if(bcrypt.compareSync(req.body.password, user.pass)){
                    /*Verifica si elijió la opcion de recordar*/
                    if(req.body.remember){
                        console.log(user.email)
                        /* creamos la cookie para el usuario*/
                        res.cookie("tcnShop", user.email, {maxAge: (1000 * 60 * 60 * 24)})  // 24 hr
                    }
                    let userLogged = {}
                    if (user.user_info){
                        user.user_info.first_name? userLogged.first_name = user.user_info.first_name:userLogged.first_name="Unnamed"
                        user.user_info.last_name? userLogged.last_name = user.user_info.last_name:userLogged.last_name="Unnamed"
                        user.user_info.profile_img? userLogged.profile_img = user.user_info.profile_img:  userLogged.img="None"
                    }
                    userLogged.email = user.email
                    userLogged.id = user.id
                    userLogged.user_role_id = user.user_role_id
                    userLogged.user_role = user.role.user_role
                    /* Si las credenciales son correctas, entonces crea la session*/
                    req.session.userLogged = userLogged// hace una copia del objeto
                     //borramos su contraseña del session
                     console.log(req.session.userLogged)                    /* Redirije al perfil*/
                     res.redirect('/users/perfil')
                }else{
                    // señalar al usuario que el correo o la contraseña es incorrecta
                  return  res.render('users/ingreso', {passwordError: 'Correo o contraseña incorrectos'})
                }
            }else{
                // señalar al usuario que el correo o la contraseña es incorrecta
            return    res.render('users/ingreso', {emailError: 'Correo o contraseña incorrectos'})
            }

        })
        .catch(function(e){
            res.status(500).send({"Message": "Hubo un error "+e})
        })
           
    },
    perfil: function(req, res){
        res.render("users/perfil")
    }, 
    logout: (req, res)=>{
        /* Elimina la cookie */
        res.clearCookie("tcnShop")
        /* Elimina la sesion */
        req.session.destroy()
        res.redirect("/")
    },
    getAllSellerSales: (req, res)=>{
        
        if(req.session.userLogged){
            db.Purchase.findAll({
                include: [
                    {association: "ticket", include: [{association: "ticket_user", include: [{association: "user_info"}]}]},
                    {association: "product"},
                ]
            })
            .then(function(data){
                /* rendereizamos una vista*/
                res.render("users/ticketlist", {tickets:data})
            })
            .catch(function(e){
                console.log(e)
            })
        }
        
    },
    getClientTicket: function(req, res){
        /*  el id de usuario debe ser el que le pasamos por session*/
        let ticket_id = req.params.id

        db.Ticket.findOne({
            include: [{association: "ticket_purchases", include: [{association: "product"}]}],
            where: {
                id: ticket_id,
                user_id: req.session.userLogged.id //  el id de usuario debe ser el que le pasamos por session*
            }
        })
        .then(function(ticket){
            if(ticket){
                /* renderiza la vista del ticket  */
                res.render("ticket", {ticket: ticket, purchases: ticket.ticket_purchases})
            } else {   
                res.status(404).render("errors/404")
            }
        })
        .catch(function(e){
            res.status(500).send({"message": "Hubo un error: "+e})

        })
    }


}

module.exports = userController