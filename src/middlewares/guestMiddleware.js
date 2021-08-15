/*
    Middleware de ruta que verifica si eres invitado o 
    si no estas logueado, entonces procede con la peticion
*/
function guestMiddleware(req, res, next){
    if(req.session.userLogged){
        res.redirect("/")
    }
    else{
        next()  
    } 
}

module.exports = guestMiddleware