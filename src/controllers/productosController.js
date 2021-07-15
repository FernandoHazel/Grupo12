const fs = require('fs');
const path = require("path")
let dataDirection= path.join(__dirname + "../../../public/data/products.json")

let rawdata = fs.readFileSync(dataDirection);
let products = JSON.parse(rawdata);



let productosController = {
    detalles: (req, res)=>{
        res.render("products/detalles")
    },
    crear: (req, res)=>{
        res.render("products/crear")
    },
    editar: (req, res)=>{
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
    categoria: (req, res,) => {
        let id = req.params.id
          let filtro = products.filter(product => {
              return product.category == id
          })
        res.render('products/categoria', {productos: filtro})
    }
}

module.exports = productosController