const fs = require('fs');
const path = require("path");
const { title } = require('process');
let dataDirection= path.join(__dirname + "../../../public/data/products.json")
const db = require("../../database/models")

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/* Data */
let rawdata = fs.readFileSync(dataDirection);
let products = JSON.parse(rawdata);

/* No. productos por página*/ 
const numberProducts = 10

function equalProducts(a, b){
    /* Funcion que compara dos productos */
    if(a.title !== b.title){return false}
    if(a.description !== b.description){return false}
    if(a.category !== b.category){return false}
    if(a.price !== b.price){return false}
    if(a.discount !== b.discount){return false}
    if(a.stock !== b.stock){return false}
    
    return true
}

let productosController = {
    detalles: (req, res)=>{
        const idUser = req.params.id;
        const article = products.find(elem =>  elem.id.toString() == idUser)
        const category = products.filter(elem =>  {return article.category == elem.category})
        res.render("products/detalles", {article: article, idUser: idUser, category: category, toThousand})
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
            console.log(e)
        })
        
    },
    store: (req, res)=>{

        /* Imagen por defecto */
        let img = "/images/productos/default.png"
        /* Obtenemos los datos del body */
        let {title, description, price, stock, category, discount} = req.body
        
        /* Si subio una imagen */
        if(req.file){
            img = "/images/productos/" + newProduct.category + "/" +req.file.filename
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
    },
    editForm: (req, res)=>{  

        /* Obtenemos el ID */
        let productId = parseInt(req.params.id, 10);
        
        /* Busca el producto en la base de datos */
        db.Product.findOne({
            include: [{association: "category"}],
            where: {
                id: productId
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
                    console.log("Error: ", e)
                })
            }
            else{
                console.log("No se encontró el producto")
                res.render("errors/404")
            }
        })
        .catch(function(e){
            console.log("Ha ocurrido un error\n", e)
        })

    },
    actualizar: (req, res)=>{

        /* Obtenemos el ID */
       let productID = parseInt(req.params.id, 10)

       /* Buscamos el índice del producto */
       let index = products.findIndex( p  => p.id === productID)

       /* Si por algo el producto ya no existe */
       if(index === -1){
           res.render("errors/404")
       }
       /* Producto editado */
       let updatedProduct = req.body

       /* Cambiamos el tipo de dato a numericos*/
       updatedProduct.price = parseFloat(updatedProduct.price)
       updatedProduct.discount = parseFloat(updatedProduct.discount)
       updatedProduct.stock = parseInt(updatedProduct.stock)

       /* Hacemos unas validaciones */
       if(equalProducts(updatedProduct, products[index]) && !req.file ){
           /* SI NO HA MODIFICADO NINGÚN CAMPO*/
           console.log("NO has modificado el producto ID: '", productID, "'")
           res.render("products/editar/"+productID)

       }else{
           /* SI ha modificado algun campo */
           
           // imagen final del producto
           let imgSrc = products[index].img   

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
                          } catch(err) {
                            console.log(err)
                          }
                    }
                    else{
                        console.log("Es la imagen DEFAULT")
                    }
                }
                /* Asignamos la nueva imagen */
                imgSrc = "/images/productos/"+updatedProduct.category+"/"+req.file.filename
                console.log("Nueva Imagen Asignada\n")
            }

            /* Guardamos el producto a actualizar */
            updatedProduct.id = productID

            if(products[index].sold){ // vendidos
                updatedProduct.sold = products[index].sold
            }
            updatedProduct.img = imgSrc

            console.log("Producto Actualizado Correctamente:\n", updatedProduct)
            /* Guardar en disco*/
            products[index] = updatedProduct
            const productsJSON = JSON.stringify(products, null, 2)
		    fs.writeFileSync(dataDirection, productsJSON)
            /* Redirecciona */
            res.redirect("/productos/detalles/"+productID)
       }

    },
    borrar: (req, res)=>{
        //Eliminamos la imágen
        let idProduct = req.params.id
        let elementToErase = products.find(elem => elem.id == parseInt(idProduct, 10))
        let imgDir = path.join(__dirname + "../../../public"+elementToErase.img)
        try{
            fs.unlinkSync(imgDir)
        }catch(error){
            console.log(error)
        }
        

        //Sobreescribimos el disco
        let index = products.findIndex(elem => elem.id == parseInt(idProduct, 10))
        products.splice(index, 1)
        fs.writeFileSync(dataDirection, JSON.stringify(products, null, 2))
        console.log()
        res.redirect('/')
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
        let id = req.params.id
        let filtro = products.filter(product => {
              return product.category === id
          })

        /* Paginacion */
        let paggination = getPaggination(req, filtro)

        /* Recupera solo los productos de una determinada página */
        let page = filtro.slice(paggination.min, paggination.min + paggination.step)
    
        /* Renderiza la página */
        res.render('products/listaProductos', {productos: page, options: id, paggination: paggination, toThousand})
    },
    all: (req, res)=>{
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
    },
    offerts: (req, res)=>{
        
        /* Filtramos los productos que tienen ofertas  */
        let offerts = products.filter(p => p.discount > 0)
        /* Calculamos el precio final */
        offerts.forEach(e =>{
            e.final_price = e.price - (e.price * e.discount / 100)
        })

        /* Obtien los datos relacionados con la paginacion */
        let paggination = getPaggination(req, offerts)
        
        /* Recupera solo los productos de una determinada página */
        let page = offerts.slice(paggination.min, paggination.min + paggination.step)

        res.render('products/listaProductos', {productos: page, options: "offerts", paggination: paggination, toThousand})
    },
    search: (req, res)=>{
        /* Obtiene el texto a buscar */
        let searchTxt = req.query.search
        if(searchTxt){
            searchTxt = searchTxt.toUpperCase()
        }
        /* Filtra los resultados */
        let productsSearch = products.filter(product =>{
            return product.title.toUpperCase().includes(searchTxt) || 
            product.description.toUpperCase().includes(searchTxt) || 
            product.category.toUpperCase().includes(searchTxt) 
        })
        /* Paginacion */
        let paggination = getPaggination(req, productsSearch)
        /* Página */
        let page = productsSearch.slice(paggination.min, paggination.min + paggination.step)

        /* Renderiza la vista con los productos que cuimplen con la busqueda*/
        res.render('products/listaProductos', {productos: page, options: "search", search_value: req.query.search, paggination: paggination, toThousand})
    },
    getSellerProducts: (req, res)=>{
        /* Devuelve los productos de un determinado usuario vendedor */
        const sellerId = req.params.sellerID
        console.log("Get ALL SELLER PRODUCTS ")
        res.json({"seller_id": sellerId})


        /* Falta renderizar una vista con los productos filtrados por seller_id */

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

module.exports = productosController