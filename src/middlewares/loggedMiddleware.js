/*
    //Este es un middleware de aplicación
    Verifica si existe una sesion en la aplicacion. De existir entonces
    guarda los datos del usuarion en locals
*/

const loggedMiddleware = (req, res, next) => {
    /* Verifica si hay un usuario logeado a nivel aplicacion */
    res.locals.isLogged = false
    /* si hay uno entonces almacenamos los datos en locals */
    if(req.session && req.session.userLogged){
        res.locals.isLogged = true
        res.locals.user = req.session.userLogged
    }

    /* Avanzamos en la cadena de peticiones  */
    next();
}

module.exports = loggedMiddleware