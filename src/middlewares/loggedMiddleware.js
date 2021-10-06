/*
    Este es un middleware de aplicación
    Verifica si existe una sesion en la aplicacion. De existir entonces
    guarda los datos del usuarion en locals
*/

const db = require('../../database/models');

const loggedMiddleware = (req, res, next) => {

    /* Verifica si hay un usuario logeado a nivel aplicacion */
    res.locals.isLogged = false

    /* Cookies */
    if(req.cookies.tcnShop){
        /* Verificar si existe la cookie tcnShop en el cliente */
        //Encontramos al usuario cuyo email venga en la cookie
        console.log('esto es lo que viene en la cookie => ' + req.cookies.tcnShop)

        db.User.findOne({
            where: {
                email: req.cookies.tcnShop,
                active: 1
            },
            include: [
                {association: 'user_info'},
                {association: "role"}
            ]
        })
        .then(function(user){

            /* Si existe ese usuario */
            if(user){
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
                
                //borramos el password para no meterlo en session
                delete user.pass 
                //creamos la session
                req.session.userLogged = userLogged
                //mandamos a toda la aplicación esta variable que trae el email, contraseña, rol del usuario etc.
                res.locals.user = userLogged
                res.locals.isLogged = true
            }
        })
        .catch(function(e){
            res.status(500).send({"message": "Hubo un error", e})
        })
    }

    /* Session*/
    /* si hay una session iniciada activamos isLogged*/
    if(req.session && req.session.userLogged){
        res.locals.isLogged = true
        res.locals.user = req.session.userLogged
    }

    /* Avanzamos en la cadena de peticiones  */
    next();
}

module.exports = loggedMiddleware