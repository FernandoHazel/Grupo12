const fs = require('fs');
const path = require("path")

/* Obtenemos los datos de productos*/
let productsDataDirection= path.join(__dirname + "../../../../public/data/products.json")
const products = JSON.parse(fs.readFileSync(productsDataDirection));

let userDataDirection= path.join(__dirname + "../../../../public/data/users.json")
const users = JSON.parse(fs.readFileSync(userDataDirection));

//obtenemos la base de datos y los módulos
const db = require('../../../database/models/index.js')


const apiPruebaController = {
    create: function(req, res){ 

        db.User.create(
            req.body
        )
        .then(function(result){
            res.json(result)
        })
        
    }, 
    modify: function(req, res){

        db.User.update(
            req.body
        ,{
            where: {id: req.params.id}
        })
        .then(function(result){
            res.json(result)
        })
    },
    destroy: function(req, res){

        db.UserRole.destroy({
            where: {id: req.params.id}
        })
        .then(function(result){
            res.json(result)
        })
    }
}

module.exports = apiPruebaController