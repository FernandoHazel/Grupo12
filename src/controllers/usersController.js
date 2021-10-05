
let bcrypt = require('bcrypt')
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
        /*creamos un objeto con los datos recibidos del formulario y una dónde 
        guardar la imágen si es que se mandó una, sino dejamos una default*/
        let newUser = req.body
        let img = "/images/usuarios/default.png"
        if(req.file){
            img = "/images/usuarios/" +req.file.filename
        }
        newUser.img = img

        //creamos un id para el usuario
        newUser.id = Date.now()

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
                    first_name: newUser.name,
                    last_name: newUser.apellido,
                    age: newUser.edad,
                    profile_img: newUser.img
                })
            })
            .catch() //falta definir que hacer en caso de error

            /* Redirige al login */
            res.redirect('/users/login')
        }else{
            res.render('users/registro', {passwordError: 'las contraseñas deben de ser iguales'})
        }
    },
    login: function (req, res) {
     
        // verificar si el correo está en la base de datos
        db.User.findOne({
            where: {email: req.body.email},
            include: [{association: 'user_info'}]
        })
        .then(function(user){  //la variable "user" ya trae los campos de user y user_info
            if(user != null){
                /* Si existe, entonces compara las contraseñas*/
                if(bcrypt.compareSync(req.body.password, user.pass)){
                    /*Verifica si elijió la opcion de recordar*/
                    if(req.body.remember){
                        /* creamos la cookie para el usuario*/
                        res.cookie("tcnShop", req.body.email, {maxAge: (1000 * 60 * 60 * 24)})  // 24 hr
                    }

                    /* Si las credenciales son correctas, entonces crea la session*/
                    req.session.userLogged = {...user}  // hace una copia del objeto
                    delete req.session.userLogged.pass //borramos su contraseña del session
                    //activamos isLogged
                    res.locals.isLogged = true
                    //mandamos a toda la app esta variable con nombre, apellido, foto etc.
                    res.locals.user = user 
                    console.log('----------------USER INFO-----------------')
                    console.log('esto viene en user = ' + user.user_info.last_name)

                    /* Redirije al perfil*/
                    res.redirect('/users/perfil')
                }else{
                    // señalar al usuario que el correo o la contraseña es incorrecta
                    res.render('users/ingreso', {passwordError: 'Correo o contraseña incorrectos'})
                }
            }else{
                // señalar al usuario que el correo o la contraseña es incorrecta
                res.render('users/ingreso', {emailError: 'Correo o contraseña incorrectos'})
            }
        })
        .catch(function(){
            res.redirect('/')
        })

    },
    perfil: (req, res)=>{
        //mandamos al usuario loggeado a la vista de perfil
        db.UserInfo.findOne({
            where: req.session.userLogged.email
        })
        .then(function(userInfo){
            res.render('users/perfil', {userInfo})
        })
    },
    logout: (req, res)=>{
        /* Elimina la cookie */
        res.clearCookie("tcnShop")
        /* Elimina la sesion */
        req.session.destroy()
        res.redirect("/")
    },
    getAllSellerSales: (req, res)=>{
        /* Devuelve los productos de un determinado usuario vendedor */
        const sellerId = req.params.sellerID
        console.log("Get ALL SALES ")
        res.json({"seller_id": sellerId})
        /* Falta renderizar una vista con las ventas del vendedor*/
    },
    getClientTicket: function(req, res){
        /*  el id de usuario debe ser el que le pasamos por session*/
        let id = req.params.id

        db.Ticket.findOne({
            include: [{association: "ticket_purchases", include: [{association: "product"}]}],
            where: {
                id: id,
                user_id: 3 //  el id de usuario debe ser el que le pasamos por session*
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