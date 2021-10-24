const fs = require('fs');
const path = require("path");
const db = require('../../database/models');
const {Op} = require("sequelize")
/* Obtenemos los datos de productos*/

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const mainController={

  home: function(req, res){  


    db.Product.findAll({
      limit: 11,
      where: {
        active: 1,
        discount: {[Op.gt]: 0}
      }
    })
    .then(offertProducts => {
        if(offertProducts){
          db.Product.findAll({
            limit: 11,
            order: [
              ['sold_units', 'DESC'],
          ]
          }).then(mostSales => {
                if(mostSales){
                  /* Renderizamos la vista */    
                  res.render('home', {offerts: offertProducts, mostSales: mostSales, toThousand});
                }else {
                  res.status(404).json({"message": "No se encontraron productos "})
                }
          }) 
          .catch(e => {
            res.status(500).json({"message": "Something went wrong "+e})
          })
        }
        else {
          res.status(404).json({"message": "No se encontraron productos "})
        }
    })
    .catch(e => {
      res.status(500).json({"message": "Something went wrong "+e})
    })
  }
}

module.exports=mainController;