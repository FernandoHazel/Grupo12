
let bcrypt = require('bcrypt')
const {validationResult}=require('express-validator')
const db = require("../../database/models")
const { Op } = require("sequelize");

const userController = {
    registroForm: (req, res)=>{
        
        res.render("./users/registro")
    },

    loginForm: (req, res)=>{
        res.render("users/login", {error: null})
    },
    add: function (req, res) {
        const errors=validationResult(req)

        //Si no hay errores creamos un nuevo usuario 
        //de lo contrario volvemos al formulario con los errores para el usuario
        if(errors.isEmpty()){
            console.log('entre errores')
            console.log(errors)
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
            newUser.id=newUser.id/1000

            
            let password = req.body.password

            //solo necesitamos una así que borramos la segunda que venía en el formulario
            delete newUser.password2

            //hasheamos la contraseña y la guardamos en nuestro objeto que se va a ir a la base de datos
            newUser.password = bcrypt.hashSync(password, 10)

            //estos son los ids que tenemos en nuestra tabla de users_roles
            let roleId
            if(newUser.profile == "seller"){
                roleId = 5
            }else{
                roleId = 6
            }
            //En el formulario ya no obtenemos la edad si no la fecha de nacimiento y hay
            // que hacer el calculo de la edad para luego mandarlo a la base de datos
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
                    first_name: newUser.name,
                    last_name: newUser.apellido,
                    age: newUser.age, //de momento si estamos guardando la edad en lugar e la fecha de nacimiento para no hacer tanto cambio en la base de datos
                    profile_img: newUser.img
                })
            })
            .then(()=>{
            return res.redirect('/users/login')
            //res.send({newUser,roleId})
            })
            .catch(function(e){
                res.send({"Message": "Hubo un error "+e})
            })
            
        }else{
            //Hay errores y regresamos al formulario con los errores
            // console.log(errors)
            res.render('users/registro',{errors:errors.mapped(),old:req.body})

        }
    },
    edit: (req, res) => {
        res.render('users/edit')
    },
    modify: (req, res) => {
        //res.send(req.body)
        let newUser = req.body
        const errors=validationResult(req)
        //Si no hay errores creamos un nuevo usuario 
        //de lo contrario volvemos al formulario con los errores para el usuario

        if(errors.isEmpty()){
            
            
            /*creamos un objeto con los datos recibidos del formulario y una dónde 
            guardar la imágen si es que se mandó una, sino dejamos una default*/
            
    
            let img = req.session.userLogged.img
            if(req.file){
                img = "/images/usuarios/" +req.file.filename
            }
            newUser.img = img

            let releaseDate = req.session.userLogged.release_date
            if (req.body.release_date != ""){
                let yearPresent= new Date()
                let year=newUser.release_date.slice(0,4)
                let age = yearPresent.getFullYear()-Number(year)
                releaseDate = age
            }
            newUser.release_date = releaseDate

            //estos son los ids que tenemos en nustra tabla de users_roles
            let roleId
            if(newUser.profile == "seller"){
                roleId = 5
            }else{
                roleId = 6
            }
            //En el formulario ya no obtenemos la edad si no la fecha de nacimiento y hay
            // que hacer el calculo de la edad para luego mandarlo a la base de datos

            

            //actualizamos la información del usuario
            db.User.update({
                user_role_id: roleId, //5 seller, 6 user
            },{
                where: {id: req.session.userLogged.id} 
            })
            .then(function(user){
                console.log('este es el usuario a modificar ' + user)
                db.UserInfo.update({
                    first_name: newUser.name,
                    last_name: newUser.apellido,
                    age: newUser.release_date, //de momento si estamos guardando la edad en lugar e la fecha de nacimiento para no hacer tanto cambio en la base de datos
                    profile_img: newUser.img
                },{
                    where: {user_id: req.session.userLogged.id} 
                })
            })
            .then(function(){
                console.log('Esto viene en el body de edit')
                console.log(req.body)
                /* Elimina la cookie */
                res.clearCookie("tcnShop")
                /* Elimina la sesion */
                req.session.destroy()
                /* Redirige al login */
                res.redirect('/users/login')
            })
            .catch(function(e){
                res.status(500).send({"Message": "Hubo un error "+e})
            })

        } else{
            //Hay errores y regresamos al formulario con los errores
            // console.log(errors)
            //console.log(req.body)
            res.render('users/edit',{errors:errors.mapped(),old:req.body})
        }
    },
    changePasswordForm: (req, res) =>{
        res.render('users/changePasswordForm')
    },
    changePassword: (req, res) =>{
        //res.send(req.session.userLogged)
        if (req.body.password == req.body.password2){
            //hasheamos la contraseña y la guardamos en nuestro objeto que se va a ir a la base de datos
            let newPassword = bcrypt.hashSync(req.body.password, 10)
            //res.send('aquí se cambiaría la contraseña')
            db.User.update({
                pass: newPassword, //5 seller, 6 user
            },{
                where: {id: req.session.userLogged.id} 
            })
            .then(function(){
                res.redirect('/users/login')
            })
            .catch(function(e){
                res.status(500).send({"Message": "Hubo un error "+e})
            })

        } else {
            res.render('users/changePasswordForm', {error: 'Las contraseñas no coinciden'})
        }
        
    },
    login: (req, res) => {
        //traemos las validaciones del formulario
        let errors = validationResult(req)

        if(errors.isEmpty()){
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
                if(user && user.active==false){
                    res.render('users/login', {error: 'Tu cuenta ha sido bloqueda, comunicate al correo "administracion@tecnoshop.com" para más información'})
                }else if(user){
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
                        userLogged.release_date = user.user_info.age
                        /* Si las credenciales son correctas, entonces crea la session*/

                        req.session.userLogged = userLogged// hace una copia del objeto
                        //borramos su contraseña del session
                        console.log('esto viene en session = '+req.session.userLogged)                    /* Redirije al perfil*/
                        res.redirect('/users/perfil')

                    }else{
                        // señalar al usuario que el correo o la contraseña es incorrecta
                        res.render('users/login', {error: 'Correo o contraseña incorrectos'})
                    }
                } else { 
                    res.render('users/login', {error: 'Tu cuenta ha sido bloqueda, comunicate al correo "administracion@tecnoshop.com" para más información'})
                }

            })
            .catch(function(e){
                console.log(e)
            })
        }else{
            //Hay errores y regresamos al formulario con los errores
            // console.log(errors)
            //console.log(req.body)
            res.render('users/login',{errors:errors.mapped(),old:req.body})
        }
        
    },
    perfil: (req, res) =>{
        console.log("Estoy aquí")
        db.Ticket.findAll({
            include: [{association: "ticket_purchases"}],
            where: {
                user_id: req.session.userLogged.id
            }
        })
        .then(function(tickets){
            console.log('tickets = ' + tickets)
            res.render("users/perfil", {tickets})
        })
        .catch(function(e){
            console.log(e)
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
    },
    getAllUsers: (req, res)=>{
        let type = req.params.type
        type = parseInt(type, 10)

        db.User.findAll({
            include: [{association: "role"}, {association: "user_info"}],
            where: {
                active: type,
                '$role.user_role$': {[Op.ne]: "admin"}
            }
        })
        .then(function(users){
            res.status(200).render("users/userList", {users, type})
        })
        .catch(function(e){
            res.status(500).send({"message": "Hubo un error: "+e})
        })
    },

    deleteAccount: (req, res)=>{
        
        let user_id = req.params.id
        user_id = parseInt(user_id, 10)

        db.User.update({
            active: 0
        }, {
        where: {
            active: 1,
            id: user_id
        }
        })
        .then(function(user){
            if(user){
                res.status(200).json({status: "ok"})
            } else {
                res.status(500).json({status: "error"})
            }
        })
        .catch(function(e){
            res.status(500).send({"message": "Hubo un error: "+e})
        })
    },
    deleteAccountUser: (req, res)=>{
        
        let user_id = req.session.userLogged.id
        user_id = parseInt(user_id, 10)

        db.User.update({
            active: 0
        }, {
        where: {
            active: 1,
            id: user_id
        }
        })
        .then(function(user){
            if(user){
                res.status(200).json({status: "ok"})
            } else {
                res.status(500).json({status: "error"})
            }
            res.redirect('/users/perfil')
        })
        .catch(function(e){
            res.status(500).send({"message": "Hubo un error: "+e})
        })
    },
    activateAccount: (req, res)=>{
        let user_id = req.params.id
        user_id = parseInt(user_id, 10)

        db.User.update({
            active: 1
        }, {
        where: {
            active: 0,
            id: user_id
        }
        })
        .then(function(user){
            if(user){
                res.status(200).json({status: "ok"})
            } else {
                res.status(500).json({status: "error"})
            }
        })
        .catch(function(e){
            res.status(500).send({"message": "Hubo un error: "+e})
        })
    },

    listEmail: (req, res)=>{
        db.User
            .findAll({
                attributes: [
                    'email'
                ]
            })
            .then(email => {
               // console.log(email)
                return res.status(200).json({
                    total: email.length,
                    data:email,
                    status: 200
                })
            })
    }


}

module.exports = userController