const fs = require('fs');
const path = require("path")


let anadirCarrito= path.join(__dirname + "../../../public/data/carrito.json")
/* Data */
let anadirC = fs.readFileSync(anadirCarrito, 'utf-8');
let anadiendoProducto = JSON.parse(anadirC);

let productos= path.join(__dirname + "../../../public/data/products.json")
/* Data */
let productosArchivo = fs.readFileSync(productos, 'utf-8');
let arrayProductos = JSON.parse(productosArchivo);

let carritoController = {

    carrito: function(req, res){    
        //Obteniendo array del usuario de el carrito.json
        const usuario = anadiendoProducto.find(elem =>  elem.correo == req.session.userLogged.email)
        let productosUsuario=usuario.array;
        //
        let array=[];
     
        for(let i=0;i<productosUsuario.length;i++){
            const objecto = arrayProductos.find(elem =>  elem.id == productosUsuario[i])
            array.push(objecto)
            console.log(array)
        }

        res.render('carrito', {user: req.session.userLogged, array: array});
    },
   
    anadirCarrito: function(req, res){

        console.log(req.session.userLogged)
        console.log(req.session.userLogged.email)

        const usuario = anadiendoProducto.find(elem =>  elem.correo == req.session.userLogged.email)

        if(usuario ){
            console.log('usuario encontrado')
            usuario.array.push(req.params.id)
        }else{
            console.log('no encontrado'+req.params.id)
           let  arrayC=[req.params.id];
            anadiendoProducto.push({correo:req.session.userLogged.email,array:arrayC });
        }

        const carritoJSON = JSON.stringify(anadiendoProducto, null, 2)
		fs.writeFileSync(anadirCarrito, carritoJSON)

        res.redirect("/users/carrito")
    },
    borrarProducto:function(req, res){
        
    }
}

module.exports=carritoController