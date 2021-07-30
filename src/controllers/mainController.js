const fs = require('fs');
const path = require("path")

/* Obtenemos los datos de productos*/
let dataDirection= path.join(__dirname + "../../../public/data/products.json")
let rawdata = fs.readFileSync(dataDirection);
const products = JSON.parse(rawdata);

const mainController={

  home: function(req, res){  
    
    /* Obtenemos todos los productos con descuento*/ 
    let offerts = products.filter(product => product.discount > 0)
    offerts = offerts.slice(0, 7)

    // agregamos el atributo "precio final" porque tienen descuento
    offerts.forEach(element => {
      element.final_price = element.price - (element.price * element.discount / 100)
    });

    /*Ordenamos por más vendidos*/
    let mostSales = products.sort(function(a, b){
       /* Prdenamos de forma descendente */
      return b.sold - a.sold;
    });
    let mostSalesFew = [...mostSales]
    mostSalesFew = mostSalesFew.slice(0, 7)
  
    /* Renderizamos la vista */    
    res.render('home', {offerts: offerts, mostSales: mostSalesFew});
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