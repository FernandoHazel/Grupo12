const sellerMiddleware = (req, res, next) => {
    if(req.session && req.session.userLogged){
        if(req.session.userLogged.profile == "seller"){
            next()
        }
    }else{
        return res.redirect('/')
    }
}

module.exports = sellerMiddleware