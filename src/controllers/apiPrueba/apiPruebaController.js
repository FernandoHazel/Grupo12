const fs = require('fs');
const path = require("path");
//const { Association } = require('sequelize/types');

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
    show: function(req, res){

        db.Ticket.findAll({
            include: [{association: 'ticket_products'}]
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