/*
    Este es un middleware de aplicación
    Verifica si existe una sesion en la aplicacion. De existir entonces
    guarda los datos del usuarion en locals
*/

const fs = require('fs');
const path = require("path")
const usersDir = path.join(__dirname, "../../public/data/users.json")

const loggedMiddleware = (req, res, next) => {
    /* Verifica si hay un usuario logeado a nivel aplicacion */
    res.locals.isLogged = false

   
 
    /* Cookies */
    /* Verificar si existe la cookie tcnShop en el cliente */
    if(req.cookies.tcnShop){
        /* Obtenemos los usuarios */
        let rawdata = fs.readFileSync(usersDir, 'utf-8');
        let users = JSON.parse(rawdata);

         /* Cookie del usuario*/
        let emailCookie = req.cookies.tcnShop
        let userLogged = users.find( user => user.email === emailCookie)

        /* Si existe ese usuario */
        if(userLogged){
            delete userLogged.password
            delete userLogged.id
            /* creamos la sesion */
            req.session.userLogged = userLogged
        }
    }
    
    /* Session*/
    /* si hay uno entonces almacenamos los datos en locals */
    if(req.session && req.session.userLogged){
        res.locals.isLogged = true
        res.locals.user = req.session.userLogged
    }

    /* Avanzamos en la cadena de peticiones  */
    next();
}

module.exports = loggedMiddleware