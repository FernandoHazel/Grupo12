const fs = require('fs');
const path = require("path");
const db = require('../../database/models');


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
        
        db.CartUser.findOne({
            include: [{association: "cart_products", include: [{association: "product"}]}],
            where: {
                user_id: req.session.userLogged.id
            }
        })
        .then(function(cart){
            res.render("carrito", {cart_products: cart.cart_products})
        })
        .catch(function(e){
            console.log(e)
            res.status(500).send({"message": "Hubo un error "+e})
        })
        
        
        //Obteniendo array del usuario de el carrito.json
       // const usuario = anadiendoProducto.find(elem =>  elem.correo == req.session.userLogged.email)
        //let productosUsuario=usuario.array;
        //
        //let array=[];
     
        //for(let i=0;i<productosUsuario.length;i++){
            //const objecto = arrayProductos.find(elem =>  elem.id == productosUsuario[i])
            //array.push(objecto)
            //console.log(array)
        //}

        //res.render('carrito', {user: req.session.userLogged, array: array});
    },
   
    anadirCarrito: function(req, res){
        console.log("Aqui mero///////////////////////////////////////////////////////", req.body)

        /* datos necesatrios*/
        let productId = req.params.id
        let quantity = req.body.cart_quantity

        productId = parseInt(productId, 10)
        quantity = parseInt(quantity, 10)

        /* verifica si el producto existe o no*/
        db.Product.findOne({
            where: {
                id: productId,
                active: 1
            }
        })
        .then(function(product){
            if(product){
                /* si existe procede con más validaciones  */
                if(quantity >0 && quantity <= product.stock){
                    /* si es menor que el stock actual del producto */

                    /* busca el id del carrito de este ussuario*/
                    db.CartUser.findOne({
                        where: {
                            user_id: req.session.userLogged.id
                        }
                    }).then(function(cart){
                        if(cart){
                            /* ahora verifica si ya tiene asignado este producto en su carrito*/
                            db.CartProduct.findOrCreate({
                                where: {
                                    product_id: product.id,
                                    cart_user_id: cart.id
                                },
                                defaults: {
                                    product_id: product.id,
                                    cart_user_id: cart.id,
                                    product_quantity: quantity
                                }
                            })
                            .then(function(result){
                                let cart_p = result[0], // the instance of the author
                                created = result[1]; // boolean stating if it was created or not
                                if(!created){
                                    res.send({"message": "Ya lo tienes agregado!"})
                                }
                                res.redirect("/users/carrito")
                            })
                            .catch(function(e){
                                console.log(e)
                            })
                        }else{
                            res.send({"message": "No tienes creado un carrito!"})
                        }
                    })
                    .catch(function(e){
                        console.log(e)
                    })
                } else {
                    res.send({"message": "No hay disponibilidad de productos!"})
                }
            } else {
                res.send({"message": "El producto no existe!!"})
            }
        })
        .catch(function(e){
            console.log(e)
        })
/*
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

        res.redirect("/users/carrito")*/
    },
    borrarProducto:function(req, res){
        
    }
}

module.exports=carritoController