let productosController = {
    detalles: (req, res)=>{
        res.render("products/detalles")
    },
    crear: (req, res)=>{
        res.render("products/crear")
    }
}

module.exports = productosController