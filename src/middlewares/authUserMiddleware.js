/*
    Middleware de ruta que verifica si estas logueado
    en la aplicacion. Puede ser usuario normal o vendedor
*/
function authUserMiddleware(req, res, next){
    if(!req.session.userLogged){
        res.redirect("/users/login")
    }
    else{
        next()  
    } 
}

module.exports = authUserMiddleware