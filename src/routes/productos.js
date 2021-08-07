const express = require("express")
const productosController = require("../controllers/productosController")
const multerIMG = require('../config/multerIMG')

const router = express.Router()

//******* redirecciona a todos los productos ********/
router.get("/", (req, res)=>{
   res.redirect("/productos/all")
})

//******* detalles ********/
router.get("/detalles/:id?", productosController.detalles)

//******* crear producto ********/
router.get("/crear", productosController.crear)
router.post("/crear", multerIMG.single('img'), productosController.store)

//******* editar producto ********/
router.get("/editar/:id", productosController.editForm)
router.put("/editar/:id", multerIMG.single('img'), productosController.actualizar)

//******* borrar producto ********/
router.delete("/borrar/:id", productosController.borrar)

//******* productos por categoria ********/
router.get("/categoria/:id?", productosController.categoria)

//******* todos los productos ********/
router.get("/all", productosController.all)

//******* ofertas ********/
router.get("/offerts", productosController.offerts)


//******* buscar productos ********/
router.get("/search-products", productosController.search)
module.exports = router