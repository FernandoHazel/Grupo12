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
            let total = 0.0
            cart.cart_products.forEach(cp => {
                let tempPrice = cp.product.discount > 0?((cp.product.price - (cp.product.price*cp.product.discount/100)) * cp.product_quantity):cp.product.price*cp.product_quantity
                tempPrice = tempPrice.toFixed(2)
                tempPrice = parseFloat(tempPrice)
                total += tempPrice
                cp.subtotal = tempPrice
            })
    
            res.render("carrito", {cart_products: cart.cart_products, total})
        })
        .catch(function(e){
            console.log(e)
            res.status(500).send({"message": "Hubo un error "+e})
        })
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
                        console.log(cart_products[0].product)
                        /*************************** */
                        /* calculamos los precios a */
                        let array_products = []
                        let total = 0.0

                        /* calculamos el precio de cada producto*/
                        cart_products.forEach( p=>{
                            // calcula el precio total con descuento si tiene 
                            let temp = 0.0
                            p.product.discount>0 ? temp=(p.product.discount / 100):0.0

                            let temp_price = (p.product.price - (p.product.price * temp )) * p.product_quantity
                            console.log("p->", temp_price)
                            /* lo ñade al total */
                           total += temp_price
                           /* Increment it's sold units */ 
                           db.Product.increment({sold_units: p.product_quantity}, { where: { id: p.product.id } })

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
                                console.log("PP", array_products)
                                /* Ahora crea la llave foránea al ticket id */
                                array_products.forEach(p =>{
                                    return p.ticket_id = ticket.id
                                })

                                /* ahora insertmos todos los productos (van a estar asociados a este ticket) */
                                db.Purchase.bulkCreate(array_products).then(function(result){
                                    if(result){
                                        console.log("EXITO")
                                        db.CartProduct.destroy({
                                            where: {
                                                cart_user_id: cart.id
                                            }
                                        })
                                        .then(function(result){
                                            if(result){
                                                console.log("carrito eliminado")
                                                res.redirect(`/users/ticket/${ticket.id}`)
                                            } else {
                                                res.redirect(`/users/ticket/${ticket.id}`)
                                            }
                                        })
                                        .catch(function(e){
                                            res.status(500).json({"message": "Algo salo mal " +e})

                                        })
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