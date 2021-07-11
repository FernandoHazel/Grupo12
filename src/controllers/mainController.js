const mainController={

  home: function(req, res){    
    res.render('home');
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