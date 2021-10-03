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
    /* Verificar si existe la cookie tcnShop en el cliente */
    if(req.cookies.tcnShop){
        
        //Encontramos al usuario cuyo email venga en la cookie
        console.log('esto es lo que viene en la cookie => ' + req.cookies.tcnShop)

        db.User.findOne({
            where: {email: req.cookies.tcnShop} 
        })
        .then(function(user){

            /* Si existe ese usuario */
            if(user != null){
                
                //borramos el password para no meterlo en session
                delete user.pass 
                //creamos la session
                req.session.userLogged = user
                //mandamos a toda la aplicación esta variable que trae el email, contraseña, rol del usuario etc.
                res.locals.user = user
                res.locals.isLogged = true
                console.log('----------------EXISTE UNA COOKIE-----------------')
                console.log('esto viene en el objeto del usuario => ' + user.email)
            }
        })
        .catch(function(){
            res.redirect('/')
        })
    }else{
        console.log('----------------NO EXISTE UNA COOKIE-----------------')
    }
    
    /* Session*/
    /* si hay una session iniciada activamos isLogged*/
    if(req.session && req.session.userLogged){
        res.locals.isLogged = true
    }

    /* Avanzamos en la cadena de peticiones  */
    next();
}

module.exports = loggedMiddleware