const fs = require('fs');
const path = require("path")

/* Obtenemos los datos de productos*/
let dataDirection= path.join(__dirname + "../../../public/data/products.json")
let rawdata = fs.readFileSync(dataDirection);
let products = JSON.parse(rawdata);

const mainController={

  home: function(req, res){  
    
    /* Obtenemos todos los productos con descuento*/ 
    let offerts = products.filter(product => product.discount > 0).splice(0, 11)
    // agregamos el atributo "precio final" porque tienen descuento
    offerts.forEach(element => {
      element.final_price = element.price - (element.price * element.discount / 100)
    });

    /*Ordenamos por más vendidos*/
    let mostSales= products.sort(function(a, b){
       /* Prdenamos de forma descendente */
      if(a.sold > b.sold){
        return -1
      }
      if(a.sold < b.sold) {
        return 1
      }
      return 0
    }).splice(0, 11);

    /* Renderizamos la vista */    
    res.render('home', {offerts: offerts, mostSales: mostSales});
  },

  carrito: function(req, res){    
      res.render('carrito');
  },
    ingreso: function(req, res){    
      res.render('users/ingreso');
    },

    registro: function(req, res){    
      res.render('users/registro');
    }

  
}

module.exports=mainController;