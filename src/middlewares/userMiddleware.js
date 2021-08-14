const userMidleware = (req, res, next) => {
    if(req.session && req.session.userLogged){
        if(req.session.userLogged.profile == "user"){
            next()
        }
    }else{
        return res.redirect('/')
    }
}

module.exports = userMidleware