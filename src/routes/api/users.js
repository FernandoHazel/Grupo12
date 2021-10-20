const express = require("express")
router = express.Router()
//const sequelize = require("sequelize")
const db = require("../../../database/models")

router = express.Router()

//mostramos todos los usuarios
router.get("/all", getAllUsers)
//mostramos todos los usuarios
router.get("/detail/:id", userDetail)

function getAllUsers(req, res){

    //buscamos a todos los usuarios con todo y su información
    db.User.findAll({
        include: [{association: 'user_info'}]
    })
    .then(function(users){

        //creamos una variable mara almacenar la cuenta y un array con los usuarios que se encuantren
        let count = 0
        let usersArray = []

        //iteramos por cada usuario encontrado
        users.forEach(user => {
            let firstName
            let lastName

            //verificamos si el campo user_info no es null
            if(user.user_info){
                firstName = user.user_info.first_name
                lastName = user.user_info.last_name
            } else {
                firstName = ""
                lastName = ""
            }
            //aumentamos el contador y añadimos al usuario al array con los campos requeridos
            count++
            usersArray.push({
                id: user.id,
                name: `${firstName} ${lastName}`,
                email: user.email,
                detail: `http://localhost:3031/api/users/detail/${user.id}`
            })
        });

        //en caso de no haber error enviamos un objeto con el response
        let response ={
            count: count,
            users: usersArray
        }
        res.status(200).json(response)
    })
    .catch(function(e){
        res.status(500).json({"message": "Something went wrong "+e})
    })
}

function userDetail(req, res){
    let userId = req.params.id

    //buscamos al usuario por id
    db.User.findOne({
        where: {id: userId},
        include: [{association: 'user_info'}]
    })
    .then(function(user){
        let img
        let firstName
        let lastName
        let age
        let createdAt
        //verificamos si el campo user_info no es null
        if(user.user_info){
            img = user.user_info.profile_img
            firstName = user.user_info.first_name
            lastName = user.user_info.last_name
            age = user.user_info.age
            createdAt = user.user_info.createdAt
        } else {
            img = ""
            firstName = ""
            lastName = ""
            age = ""
            createdAt = ""
        }
        let response = {
            id: user.id,
            email: user.email,
            active: user.active,
            //esto viene en user_info
            first_name: firstName,
            last_name: lastName,
            age: age,
            profile_img: img?`http://localhost:3031${img}`:'',
            createdAt: createdAt
        }
        res.send(response)
    })
}
module.exports=router