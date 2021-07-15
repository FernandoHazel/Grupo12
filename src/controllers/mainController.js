
const mainController={

  home: function(req, res){   
    let offerts = [
      {
        img: "/images/productos/audio/Apple EarPods con conector Lightning - Blanco.png",
        product_title: "Apple Earpods",
        description: "De muy alta calidad",
        offert: 25
      },
      {
        img: "/images/productos/cables/Cable elite USB tipo A 3.0 a micro USB tipo B 3.0 de 1,8 m.PNG",
        product_title: "Cable Elite USB",
        description: "Tipo 3.0",
        offert: 35
      },
      {
        img: "/images/productos/computadoras/Alienware M15 R4 Gaming Laptop I7-10870h 16gb Rtx 3070 512gb.PNG",
        product_title: "Alienwere M15",
        description: "Laptop Gamming",
        offert: 40
      },
      {
        img: "/images/productos/herramientas/Multímetro profesional auto rango.PNG",
        product_title: "Multilímetro profesional",
        description: "Gran calidad",
        offert: 15
      }
    ] 

    let mostSales = [
      {
        img: "/images/productos/audio/Apple EarPods con conector Lightning - Blanco.png",
        name: "Produto 1",
        price: 450
      },
      {
        img: "/images/productos/cables/Cable elite USB tipo A 3.0 a micro USB tipo B 3.0 de 1,8 m.PNG",
        name: "Produto 2",
        price: 4500
      },
      {
        img: "/images/productos/herramientas/Multímetro profesional auto rango.PNG",
        name: "Produto 3",
        price: 1000
      },
      {
        img: "/images/productos/computadoras/Alienware M15 R4 Gaming Laptop I7-10870h 16gb Rtx 3070 512gb.PNG",
        name: "Produto 4",
        price: 500
      },
      {
        img: "/images/productos/2.jpg",
        name: "Produto 5",
        price: 100
      }
    ]
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