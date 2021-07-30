const { fileLoader } = require('ejs');
const fs = require('fs');
const path = require("path")
let dataDirection= path.join(__dirname + "../../../public/data/products.json")

let rawdata = fs.readFileSync(dataDirection);
let products = JSON.parse(rawdata);

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
    store: function (req, res) {
        const newProduct = req.body
        console.log('producto agregado', newProduct)

        const category = req.body.category
        const img = req.file

        newProduct.id = Date.now()

        newProduct.img = img.destination.replace('public', '') + img.originalname;

        products.push(newProduct)
        let productsJSON = JSON.stringify(products, null, 2)
		fs.writeFileSync(dataDirection, productsJSON)

        res.redirect("/")
    },
    editor: (req, res)=>{
        let productId = req.params.id
        console.log("Product ID: ", productId)

        res.render("products/editar", 
        {
            product: {
                name: "TV Samsung 19''",
                price: 3500,
                description: "Television de alta resolucion que soporta 3 entradas HDMI",
                quantity: 124,
                category: "TV",
                img: "/images/productos/1.png"
            },
        }
    )},
    editar: (req, res)=>{
        //agregar lógica para editar
        res.redirect('/')
    },
    borrar: (id)=>{
        
        let newList = products.filter(element => element.id != id)
        let productsJSON = JSON.stringify(newList, null, 2)
        fs.writeFileSync(dataDirection, productsJSON)
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