/*
    funcion que verifica si un usuario es cliente
*/

function customerAuthMiddleware(req, res, next){
 
    if(req.session.userLogged && req.session.userLogged.user_role ==="user"){
        next()
    }else {
        res.redirect("/")
    }
}


module.exports = customerAuthMiddleware