const mainController={

  home: function(req, res){    
    return      res.render('../src/views/home');
  },

  carrito: function(req, res){    
      return      res.render('../src/views/carrito');
  },
    ingreso: function(req, res){    
      return      res.render('../src/views/users/ingreso');
    },

    registro: function(req, res){    
      return      res.render('../src/views/users/registro');
    }

  
}

module.exports=mainController;