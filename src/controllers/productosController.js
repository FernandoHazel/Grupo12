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
                img: "/images/productos/1.png"
            }
        }
    )}
}

module.exports = productosController