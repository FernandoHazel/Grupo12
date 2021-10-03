const fs = require('fs');
const path = require("path")
let dataDirection= path.join(__dirname + "../../../public/data/users.json")
let bcrypt = require('bcrypt');
const db = require('../../database/models');

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
    },
    getClientTicket: function(req, res){
        /*  el id de usuario debe ser el que le pasamos por session*/
        let id = req.params.id

        db.Ticket.findOne({
            include: [{association: "ticket_purchases", include: [{association: "product"}]}],
            where: {
                id: id,
                user_id: 3 //  el id de usuario debe ser el que le pasamos por session*
            }
        })
        .then(function(ticket){
            if(ticket){
                /* renderiza la vista del ticket  */
                res.render("ticket", {ticket: ticket, purchases: ticket.ticket_purchases})
            } else {   
                res.status(404).render("errors/404")
            }
        })
        .catch(function(e){
            res.status(500).send({"message": "Hubo un error: "+e})

        })
    }


}

module.exports = userController