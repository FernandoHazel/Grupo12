/*
    funcion que verifica si un usuario es vendedor
*/

function sellerAuthMiddleware(req, res, next){
    if(req.session.userLogged && req.session.userLogged.user_role ==="seller"){
        next()
    } else {
        res.redirect("/")
    }
}


module.exports = sellerAuthMiddleware