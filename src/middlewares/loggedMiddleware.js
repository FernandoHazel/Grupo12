//Este es un middleware de aplicación
const loggedMiddleware = (req, res, next) => {
    res.locals.isLogged = false
    
    if(req.session && req.session.userLogged){
        res.locals.isLogged = true
        res.locals.user = req.session.userLogged
        next()
    }else{
        //return res.redirect('users/login')
        next() //esto hay que corregirlo
    }
}

module.exports = loggedMiddleware