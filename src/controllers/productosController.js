const fs = require('fs');
const path = require("path")
let dataDirection= path.join(__dirname + "../../../public/data/products.json")

/* Data */
let rawdata = fs.readFileSync(dataDirection);
let products = JSON.parse(rawdata);

function equalProducts(a, b){
    console.log(a)
    console.log(b)
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
        res.render("products/detalles", {article: article, idUser: idUser, category: category})
    },
    crear: (req, res)=>{
        res.render("products/crear")
    },
    store: (req, res)=>{

        /* Imagen por defecto */
        let img = "/images/productos/default.png"
        const newProduct = req.body
        
        /* Si subio una imagen */
        if(req.file){
            img = "/images/productos/" + newProduct.category + "/" +req.file.filename
        }
    
        /*vendidos  */
        newProduct.sold = 0
        /* Imagen */
        newProduct.img = img

        /* Id */
        newProduct.id = Date.now(),
    
        /* Guarda en disco */
        products.push(newProduct)
        const productsJSON = JSON.stringify(products, null, 2)
		fs.writeFileSync(dataDirection, productsJSON)

        res.redirect("/")
    },
    editForm: (req, res)=>{             
        /* Obtenemos el ID */
        let productId = parseInt(req.params.id, 10);

        /* Buca el indice del producto en el array*/
        let index = products.findIndex(p => p.id === productId)

        /* Renderizar vista segun el indice */
        index === -1 ? res.render("errors/404") : res.render("products/editar", {product: products[index]})  
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
        //agregar lógica para borrar
        res.redirect('/')
    },
    categoria: (req, res,) => {
        let id = req.params.id
          let filtro = products.filter(product => {
              return product.category == id
          })
        res.render('products/listaProductos', {productos: filtro, options: id})
    },
    all: (req, res)=>{
        /* Verifica si tiene descuento y calcula su precio final */
        products.forEach(element => {
            if(element.discount > 0){
                /* Crea una propiedad de final price */
                element.final_price = element.price - (element.price * element.discount / 100)
            }
        });
        /* Renderizamos la vista */
        res.render('products/listaProductos', {productos: products, options: "all"})
    },
    offerts: (req, res)=>{
        /* Filtramos los productos que tienen ofertas  */
        let offerts = products.filter(p => p.discount > 0)
        /* Calculamos el precio final */
        offerts.forEach(e =>{
            e.final_price = e.price - (e.price * e.discount / 100)
        })
        res.render('products/listaProductos', {productos: offerts, options: "offerts"})
    }
}

module.exports = productosController