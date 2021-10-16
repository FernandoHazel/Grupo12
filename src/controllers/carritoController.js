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
                                }else{
                                    res.redirect("/users/carrito")
                                }   
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
    },
    borrar: (req, res)=>{
        console.log("Metodo para borrar")


        db.CartUser.findOne({
            where: {
                user_id: req.session.userLogged.id
            }
        })
        .then(function(cart){
            if(cart){
                db.CartProduct.destroy({
                    where: {
                        cart_user_id: cart.id
                    }
                })
                .then(function(result){
                    if(result){
                        res.status(200).json({"message": "ok"})
                    } else {
                        res.status(300).json({"message": "null"})
                    }
                })
                .catch(function(e){
                    res.status(500).render({"message": "Algo salió mal "+e})
                })
            }else{
                res.status(404).json({"message": "NO existe tu carrito!!"})
            }
        })
        .then(function(e){
            console.log(e)
        })
        
    },
    buyCart: (req, res) => {

        db.CartUser.findOne({
            where: {
                user_id: req.session.userLogged.id
            }
        })
        .then(function(cart){
            if(cart){
                db.CartProduct.findAll({
                    include: [{association: "product"}],
                    cart_user_id: cart.id
                })
                .then(function(cart_products){
                    if(cart_products && cart_products.length > 0){

                        /*************************** */
                        /* calculamos los precios a */
                        let array_products = []
                        let total = 0.0

                        /* calculamos el precio de cada producto*/
                        cart_products.forEach( p=>{
                            // calcula el precio total con descuento si tiene 
                            let temp_price = (p.product.price - (p.produt.price * p.product.discount>0?(p.product.discount / 100):0 )) * p.product_quantity

                            /* lo ñade al total */
                            total += temp_price

                            /* lo añade al array de productos */
                            array_products.push({product_id: p.product.id, individual_price: temp_price, product_quantity: p.product_quantity})
                        })

                        /* creamos el ticket con el total de la suma de productos */
                        db.Ticket.create({
                            user_id: req.session.userLogged.id,
                            total_price: total
                        })
                        .then(function(ticket){
                            if(ticket){
                                /* Ahora crea la llave foránea al ticket id */
                                arrayProductos.forEach(p =>{
                                    return p.ticket_id = ticket.id
                                })

                                /* ahora insertmos todos los productos (van a estar asociados a este ticket) */
                                db.Purchases.bulkCreate(arrayProductos).then(function(result){
                                    if(result){
                                        console.log("EXITO")
                                        res.json({"Messge": "Compra exitosa!"})
                                    } else {
                                        res.json({"message": "NO pudimos concretar la compra"})
                                    }
                                })
                                .catch(function(e){
                                    res.status(500).json({"message": "Algo salo mal " +e})
                                })

                            } else {
                                res.status(300).json({"message": "No se pudo concretar la compra"})
                            }
                        })
                        .catch(function(e){
                            res.status(500).json({"message": "Algo salo mal " +e})
                        })

                        /*************************************/
                    } else {
                        res.status(300).json({"message": "NO tienes ningún producto en tu carrito"})
                    }
                })
                .catch(function(e){
                    res.status(500).json({"message": "Algo salo mal " +e})
                })
            } else{
                res.sattus(404).json({"message": "NO existe tu carrito!!"})
            }
        })
        .catch(function(e){
            res.status(500).json({"message": "Algo salo mal " +e})
        })
        
    }
}

module.exports=carritoController