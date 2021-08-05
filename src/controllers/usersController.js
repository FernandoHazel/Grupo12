const fs = require('fs');
const path = require("path")
let dataDirection= path.join(__dirname + "../../../public/data/users.json")
let bcrypt = require('bcrypt')

/* Data */
let rawdata = fs.readFileSync(dataDirection);
let users = JSON.parse(rawdata);

const userController = {
    add: function (req,res) {
        let img = "/images/productos/default.png"
        let newUser = req.body

        if(req.file){
            img = "/images/usuarios/" +req.file.filename
        }
        newUser.img = img
        newUser.id = Date.now()

        //añadir verificaciones de express validator
        //verificar que ambas contraseñas sean iguales

        let password = req.body.password
        delete newUser.password2

        let hash = bcrypt.hashSync(password, 10)
        newUser.password = hash

        //guardar en el disco
        users.push(newUser)
        fs.writeFileSync(dataDirection, JSON.stringify(users, null, 2))
        res.redirect('/')
    },
    login: function (req, res) {

        //lógica para loguear usuario
        //verificar si el correo está en la base de datos
        let correo = req.body.email
        let index = users.findIndex(user => user.email == correo)
        if(index != -1){
            if(bcrypt.compareSync(req.body.password, users[index].password)){
                req.session = users[index]
                delete req.session.password
                delete req.session.id
                console.log('sesión creada')
            }
            
        }
        
        //verificar si la contraseña de ese usuario es correcta

        res.send('Usuario logueado')
    }
}

module.exports = userController