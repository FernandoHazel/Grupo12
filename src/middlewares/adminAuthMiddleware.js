/*
    funcion que verifica si un usuario es adminnistrdor
*/

function adminAuthMiddleware(req, res, next){
 
    if(req.session.userLogged && req.session.userLogged.user_role ==="admin"){
        next()
    }else {
        res.redirect("/")
    }
}


module.exports = adminAuthMiddleware