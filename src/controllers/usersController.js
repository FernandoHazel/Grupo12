const fs = require('fs');
const path = require("path")
let dataDirection= path.join(__dirname + "../../../public/data/users.json")
let bcrypt = require('bcrypt')
const {validationResult}=require('express-validator')


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
        const errors=validationResult(req)
        //Si no hay errores creamos un nuevo usuario 
        //de lo contrario volvemos al formulario con los errores para el usuario

        if(errors.isEmpty()){
            //res.send(req.body)
            
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

                    //Redirige al login 
                    res.redirect('/users/login')
                }else{
                    console.log('usando  render compañero')
                    res.render('users/registro', {passwordError: 'las contraseñas deben de ser iguales'})
                }
            } 
            else{
                //Hay errores y regresamos al formulario con los errores
               // console.log(errors)
                //console.log(req.body)
                res.render('users/registro',{errors:errors.mapped(),old:req.body})

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
    },
    getAllSellerSales: (req, res)=>{
        /* Devuelve los productos de un determinado usuario vendedor */
        const sellerId = req.params.sellerID
        console.log("Get ALL SALES ")
        res.json({"seller_id": sellerId})
        /* Falta renderizar una vista con las ventas del vendedor*/
    }


}

module.exports = userController