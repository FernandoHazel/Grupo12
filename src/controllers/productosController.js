const fs = require('fs');
const path = require("path");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/* Sequelize*/
const db = require("../../database/models")
const { Op } = require("sequelize");

/* No. productos por página*/ 
const numberProducts = 10

let productosController = {
    detalles: (req, res)=>{
        /*
        const idUser = req.params.id;
        const article = products.find(elem =>  elem.id.toString() == idUser)
        const category = products.filter(elem =>  {return article.category == elem.category})
        res.render("products/detalles", {article: article, idUser: idUser, category: category, toThousand})*/
        const idProduct = req.params.id

        db.Product.findOne({
            where: {
                id: idProduct,
                active: 1
            }
        })
        .then(function(product){
            if(product){
                db.Product.findAll({
                    where: {
                        category_id: product.category_id,
                        active: 1,
                        id: {[Op.ne]: product.id}
                    },
                    limit: 10
                })
                .then(function(data){
    
                    res.render("products/detalles", {article:product, category: data, toThousand})
                })
                .catch(function(e){
                    res.status(500).send({"messge": "Hubo un error: "+e})
                })
            }
            else{
                res.status(404).render("errors/404")
            }
        })
        .catch(function(e){
             res.status(500).send({"messge": "Hubo un error: "+e})
        })
       },
   
    crear: (req, res)=>{
        /* Primero busca las categorias de los productos*/
        db.Category.findAll()
        .then(function(categories){
            if(categories.length){
                res.render("products/crear", {categories})
            }
            else{
                console.log("No existen categorias")
                res.send({"message": "error"})
            }
        })
        .catch(function(e){
            res.status(500).send({"message": "Hubo un error: "+e})
        })
        
    },
    store: (req, res)=>{

        /* Imagen por defecto */
        let img = "/images/productos/default.png"
        /* Obtenemos los datos del body */
        let {title, description, price, stock, category, discount} = req.body
        
        /* Si subio una imagen */
        if(req.file){
            img = "/images/productos/"+req.file.filename
        }
        /* creamos el ofjeto en la base de datos*/
        db.Product.create(
            {
                category_id: parseInt(category, 10),
                seller_id: 2, // debe ser el id del vendedor
                title,
                description,
                price,
                stock,
                img,
                discount
            }
        )
        .then(function(result){
            if(result){
                res.redirect("/")
                console.log("Producto creado exitosamente con ID: {"+result.dataValues.id+"}")
            }
            else{
                console.log("Ha ocurrido un error")
                res.send({"message": "No se pudo crear el producto"})
            }
        })
        .catch(function(e){
            res.status(500).send({"message": "Hubo un error: "+e})
        })
    },
    editForm: (req, res)=>{  

        /* Obtenemos el ID */
        let productId = parseInt(req.params.id, 10);
        
        /* Busca el producto en la base de datos */
        db.Product.findOne({
            include: [{association: "category"}],
            where: {
                id: productId,
                active: 1
            }
        })
        .then(function(product){
            if(product){
                /* Buscamos las categorias */
                db.Category.findAll()
                .then(function(categories){
                    res.render("products/editar", {product: product.dataValues, categories})  
                })
                .catch(function(e){
                    res.status(500).send({"message": "Hubo un error: "+e})
                })
            }
            else{
                console.log("No se encontró el producto")
                res.render("errors/404")
            }
        })
        .catch(function(e){
            res.status(500).send({"message": "Hubo un error: "+e})
        })

    },
    actualizar: (req, res)=>{
        /* Obtenemos el ID */
       let productID = parseInt(req.params.id, 10)

       /* Buscamos el índice del producto */
       db.Product.findOne({
           where: {
               id: productID,
               active: 1
           }
       })
       .then(function(product){
            if(product){
                updateProductLogic(req, res, product)
            }
            else{
                res.render("errors/404")
            }
       })
       .catch(function(e){
            res.status(500).send({"message": "Hubo un error: "+e})
       })
    },
    borrar: (req, res)=>{
        //Eliminamos la imágen
        let idProduct = req.params.id
        
        /* Busca el producto */
        db.Product.findOne({
            where: {
                id: idProduct,
                active: 1
            }
        })
        .then(function(product){
            if(product){
                /* Lo inactivamos */
                product.active = 0;
                product.save()
                .then(function(result){
                    if(result){
                        /* Elimina su imagen asociada*/
                        let imgDir = path.join(__dirname + "../../../public"+result.img)
                        try{
                            fs.unlinkSync(imgDir)
                        }catch(error){
                            console.log(error)
                        }
                        res.redirect('/')
                    }
                    else{
                        res.send({"message": "No pudimos eliminar el producto"})
                    }
                })
                .catch(function(e){
                    res.status(500).send({"message": "Hubo un error: "+e})
                })
            }
            else{
                res.render("errors/404")
            }
        })
        .catch(function(e){
            res.status(500).send({"message": "Hubo un error: "+e})
        })

    },
    categoria: (req, res,) => {
        /* Obtiene los datos para la paginacion */
        const pagginationParam = req.query
        let start = 0
        if(pagginationParam && pagginationParam.min){
            try {
                 start = parseInt(pagginationParam.min);
              } catch (error){
                console.log(error)
              }
        }

        /* Filtramos los productos por una determinada categoria */
        let category = req.params.id

        /* busca los productos que coincidan con la busqueda */
        db.Product.findAll({
            include: [{association: "category", where:{name: category}}],
            where:{
                active: 1
            }
        })
        .then(function(filtro){
            /* Paginacion */
            let paggination = getPaggination(req, filtro)

            /* Recupera solo los productos de una determinada página */
            let page = filtro.slice(paggination.min, paggination.min + paggination.step)
    
            /* Renderiza la página */
            res.render('products/listaProductos', {productos: page, options: category, paggination: paggination, toThousand})
        })
        .catch(function(e){
            res.status(500).send({"message": "Hubo un error: "+e})
        })
    },
    all: (req, res)=>{

        db.Product.findAll({
            where: {
                active: true
            }
        })
        .then(function(products){
        
            /* Verifica si tiene descuento y calcula su precio final */
            products.forEach(element => {
                 if(element.discount > 0){
                    /* Crea una propiedad de final price */
                    element.final_price = element.price - (element.price * element.discount / 100)
                }
            });

            /* Paginacion */
            let paggination = getPaggination(req, products)

            /* Obtiene la pagina actual corrspondiente */
            let page = products.slice(paggination.min, paggination.min + paggination.step)

            /* Renderizamos la vista */
            res.render('products/listaProductos', {productos: page, options: "all", paggination: paggination, toThousand})  
        })
        .catch(function(e){
            res.status(500).send({"message": "Hubo un error: "+e})

        })
    
    },
    offerts: (req, res)=>{
        
        /* Filtramos los productos que tienen ofertas  */
        let offerts = products.filter(p => p.discount > 0)

        db.Product.findAll({
            where: {
                active: true,
                discount: {[Op.gt]: 0}
            }
        })
        .then(function(offerts){
            /* Calculamos el precio final */
            offerts.forEach(e =>{
                e.final_price = e.price - (e.price * e.discount / 100)
            })

            /* Obtien los datos relacionados con la paginacion */
            let paggination = getPaggination(req, offerts)

            /* Recupera solo los productos de una determinada página */
            let page = offerts.slice(paggination.min, paggination.min + paggination.step)

            res.render('products/listaProductos', {productos: page, options: "offerts", paggination: paggination, toThousand})

        })
        .catch(function(e){
            res.status(500).send({"message": "Hubo un error: "+e})
        })

    },
    search: (req, res)=>{
        /* Obtiene el texto a buscar */
        let searchTxt = req.query.search
        if(searchTxt){
            searchTxt = searchTxt.toUpperCase()
        }
        /* Filtra los resultados */
        db.Product.findAll({
            include: [{association: 'category'}],
            where: {
                [Op.or]: {
                    '$Category.name$': {[Op.like]: `%${searchTxt}%`},
                    title: {[Op.like]: `%${searchTxt}%`},
                    description: {[Op.like]: `%${searchTxt}%`},
                }
            }
        })
        .then(function(productsSearch){
            /* Paginacion */
            let paggination = getPaggination(req, productsSearch)
            /* Página */
            let page = productsSearch.slice(paggination.min, paggination.min + paggination.step)

            /* Renderiza la vista con los productos que cuimplen con la busqueda*/
            res.render('products/listaProductos', {productos: page, options: "search", search_value: req.query.search, paggination: paggination, toThousand})

        })
        .catch(function(e){
            res.status(500).send({"message": "Hubo un error: "+e})
        })
    },
    getSellerProducts: (req, res)=>{
        /* Devuelve los productos de un determinado usuario vendedor */
       if(req.session.userLogged){
            const sellerId = req.session.userLogged

            db.Product.findAll({
                where: {
                    active: true,
                    seller_id: sellerId
                }
            })
            .then(function(products){
                /* Paginacion */
                let paggination = getPaggination(req, products)
                /* Página */
                let page = products.slice(paggination.min, paggination.min + paggination.step)

                /* Renderiza la vista con los productos que cuimplen con la busqueda*/
                res.render('products/listaProductos', {productos: page, options: "myProducts", search_value: req.query.search, paggination: paggination, toThousand})
            })
            .catch(function(e){
                res.status(500).send({"message": "Hubo un error: "+e})
            })
    }else{
        res.status(303).send({"message": "No eres vendedor"})
    }
  },
  buy: function(req, res){
    if(req.session.userLogged){
        let id = req.params.id
        console.log(id)
        console.log(req.body)
         db.Product.findOne({
            where: {
                id: id,
                active: true
            }
        })
        .then(function(product){
            if(product){
                let productQuantity = parseFloat(req.body.cantidad)
                let total = (product.price - (product.price * product.discount / 100)) * productQuantity
                console.log(total)

                db.Ticket.create({
                    user_id: 3,
                    total_price: total
                })
                .then(function(ticket){
                    if(ticket){
                        db.Purchase.create({
                            ticket_id: ticket.id,
                            product_id: product.id,
                            individual_price: total,
                            product_quantity: productQuantity
                        })
                        .then(function(purchase){
                            if(purchase){
                                console.log("COMPRA EXITOSA")
                                res.redirect("/users/ticket/"+ticket.id)
                            } else {
                                res.status(400).send({"message": "No se pudo concretar la compra"})
                            }
                        })
                        .catch(function(e){
                            res.status(500).send({"message": "Hubo un error: "+e})
                        })

                    } else {
                        res.status(400).send({"message": "No se pudo concretar la compra"})
                    }
                })
                .catch(function(e){
                    res.status(500).send({"message": "Hubo un error: "+e})
                })
            } else {
                res.render("errors/404")
            }
        })
        .catch(function(e){
            res.status(500).send({"message": "Hubo un error: "+e})
        })
    } else {
        res.status(303).render({"message": "Permiso denegado"})
    }
  }
}

function getPaggination(req, productsView){
    /*
        Funcion que controla los parametros necesarios para mostrar
        una parte del arreglo de productos para simular "paginacion"
    */

    /* Objeto de paginacion */
    let paggination = {}

    /* Obtiene los datos para la paginacion */
    const pagginationParam = req.query

    /* Valida el indice de inicio */
    let start = 0  // indice de inicio
    if(pagginationParam && pagginationParam.min){ 
        /* obtiene el dato de inicio obtenido en el query string */
        try {
            /* Lo convierte a entero */
             start = parseInt(pagginationParam.min);
             if(start < 0){
                 start = 0
             }
             else if(start > productsView.length){
                 start = productsView.length
             }
          } catch (error){ 
              /*Ha ocurrido un error*/ 
            console.log(error)
          }
    }

    /* Datos de paginacion */
    paggination.path = req.path
    paggination.min = start
    paggination.step = numberProducts // cantidad total de productos por página
    paggination.totalProducts = productsView.length

    /* Paginas totales */
    let calculatePages = Math.ceil(productsView.length/numberProducts)
    calculatePages <= 0 ? paggination.totalPages = 1 : paggination.totalPages = calculatePages
    
    /* Pagina actual */
    let page = 1
    /* Valida la página actual*/
    if(pagginationParam && pagginationParam.page){
        /* obtiene la página actual en el query string */
        try {
            /* Lo convierte a entero */
             page = parseInt(pagginationParam.page);
             if(page < 1){
                 page = 1
             }
             else if(page > paggination.totalPages){
                 page = paggination.totalPages
             }
          } catch (error){ 
              /*Ha ocurrido un error*/ 
            console.log(error)
          }
    }
    paggination.actualPage = page
    
    return paggination
}


function updateProductLogic(req, res, product){
    /* Producto editado */
    let updatedProduct = req.body

    /* Cambiamos el tipo de dato a numericos*/
    updatedProduct.price = parseFloat(updatedProduct.price)
    updatedProduct.discount = parseFloat(updatedProduct.discount)
    updatedProduct.stock = parseInt(updatedProduct.stock, 10)
    updatedProduct.category_id = parseInt(updatedProduct.category, 10)
    delete updatedProduct.category

 
    /* Hacemos unas validaciones */
    if(equalProducts(updatedProduct, product) && !req.file ){
        /* SI NO HA MODIFICADO NINGÚN CAMPO*/
        console.log("NO has modificado el producto ID: '", product.id, "'")
        res.redirect("/productos/editar/"+product.id)

    }else{
        /* SI ha modificado algun campo */
    
        // imagen final del producto
        let imgSrc = product.img   

        if(req.file){
            /* Si ha modificado la imagen del producto */

            /* Eliminar la imagen previa del producto */
            let imgToDelete = imgSrc

            /* Elimina la imagen anterior */
            if(imgToDelete){
                /* verificamos si no es la imagen default.png   */
                let subDirectories = imgToDelete.split("/")

                if(subDirectories[subDirectories.length - 1] !== "default.png"){
                    /* Path para eliminar*/
                    let imgDir = path.join(__dirname + "../../../public"+imgToDelete)
                    /* Eliminamos */
                    try {
                        fs.unlinkSync(imgDir)
                        console.log("Imagen anterior eliminada\n")
                        //file removed
                    }catch(err) {
                        console.log(err)
                    }
                }
                else{
                    console.log("Es la imagen DEFAULT")
                }
            }
            /* Asignamos la nueva imagen */
            imgSrc = "/images/productos/"+req.file.filename
            console.log("Nueva Imagen Asignada\n")
        }

        /* Actualizamos */
        db.Product.update({
            img: imgSrc,
            price: updatedProduct.price,
            stock: updatedProduct.stock,
            discount: updatedProduct.discount,
            title: updatedProduct.title,
            description: updatedProduct.description,
            category_id: updatedProduct.category_id
        },{
            where: {
                id: product.id
            }
        })
        .then(function(updated){
            if(updated){
                console.log("Producto Actualizado Correctamente:\n", updated)
                res.status(200).redirect("/productos/detalles/"+product.id)
            }
            else{
                console.log("No se pudo actualizar")
                res.send({"message": "No se pudo actualizar el producto {"+product.id+"}"})
            }
        })
        .catch(function(e){
            res.status(500).send({"message": "Hubo un error: "+e})
        })
    }
}

function equalProducts(a, b){
    /* Funcion que compara dos productos */
    if(a.title !== b.title){return false}
    if(a.description !== b.description){return false}
    if(a.category_id !== b.category_id){return false}
    if(a.price !== b.price){return false}
    if(a.discount !== b.discount){return false}
    if(a.stock !== b.stock){return false}
    
    return true
}
module.exports = productosController