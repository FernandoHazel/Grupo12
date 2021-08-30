const fs = require('fs');
const path = require("path")
let dataDirection= path.join(__dirname + "../../../public/data/users.json")
let bcrypt = require('bcrypt')

/* Data */
let rawdata = fs.readFileSync(dataDirection, 'utf-8');
let users = JSON.parse(rawdata);

const userController = {
    registroForm: (req, res)=>{
        res.render("./users/registro")
    },
    loginForm: (req, res)=>{
        res.render("./users/ingreso")
    },
    add: function (req, res) {
        let img = "/images/productos/default.png"
        let newUser = req.body

        img = "/images/usuarios/default.png"

        if(req.file){
            img = "/images/usuarios/" +req.file.filename
        }
        newUser.img = img
        newUser.id = Date.now()

        //añadir verificaciones de express validator
        //verificar que ambas contraseñas sean iguales
        if(req.body.password === req.body.password2){
            let password = req.body.password
            delete newUser.password2
            let hash = bcrypt.hashSync(password, 10)
            newUser.password = hash

            //guardar en el disco
            users.push(newUser)
            fs.writeFileSync(dataDirection, JSON.stringify(users, null, 2))

            /* Redirige al login */
            res.redirect('/users/login')
        }else{
            res.render('users/registro', {passwordError: 'las contraseñas deben de ser iguales'})
        }
    },
    login: function (req, res) {
     
        // verificar si el correo está en la base de datos
        let correo = req.body.email
        let index = users.findIndex(user => user.email === correo)
        
        if(index != -1){
            /* Si existe, entonces compara las contraseñas*/
            if(bcrypt.compareSync(req.body.password, users[index].password)){

                /*Verifica si elijió la opcion de recordar*/
                if(req.body.remember){
                    /* creamos la cookie para el usuario*/
                    res.cookie("tcnShop", correo, {maxAge: (1000 * 60 * 60 * 24)})  // 24 hr
                }

                /* Si las credenciales son correctas, entonces crea la session*/
                req.session.userLogged = {...users[index]}  // hace una copia del objeto
                delete req.session.userLogged.password
                delete req.session.userLogged.id
                
                /* Redirije al perfil*/
                res.redirect('/users/perfil')
            }else{
                //señalar al usuario que la contraseña es incorrecta
                res.render('users/ingreso', {passwordError: 'Correo o contraseña incorrectos'})
            }
            
        }else{
            // señalar al usuario que el correo no está registrado
            res.render('users/ingreso', {emailError: 'Correo o contraseña incorrectos'})
        }
    },
    perfil: (req, res)=>{
        //mandamos al usuario loggeado a la vista de perfil
        const user =  req.session.userLogged

        res.render('users/perfil', {user})
    },
    logout: (req, res)=>{
        /* Elimina la cookie */
        res.clearCookie("tcnShop")
        /* Elimina la sesion */
        req.session.destroy()
        res.redirect("/")
    }
}

module.exports = userController