const express = require("express")
const productosController = require("../controllers/productosController")

const multerIMG = require('../config/multerIMG')

const router = express.Router()

//******* redirecciona a todos los productos ********/
router.get("/", (req, res)=>{
   res.redirect("/productos/all")
})

/* GUEST o USUARIOS CLIENTES */
//******* detalles ********/
router.get("/detalles/:id?", productosController.detalles)

//******* productos por categoria ********/
router.get("/categoria/:id?", productosController.categoria)

//******* todos los productos ********/
router.get("/all", productosController.all)

//******* ofertas ********/
router.get("/offerts", productosController.offerts)

//******* buscar productos ********/
router.get("/search-products", productosController.search)


/* VENDEDOR: requiere un middleware de autenticación */
//******* crear producto ********/
router.get("/crear", productosController.crear)
router.post("/crear", multerIMG.single('img'), productosController.store)

//******* editar producto ********/
router.get("/editar/:id", productosController.editForm)
router.put("/editar/:id", multerIMG.single('img'), productosController.actualizar)

//******* borrar producto ********/
router.get("/borrar/:id", productosController.borrar)

/* productos del vendedor */
router.get("/seller/:sellerID", productosController.getSellerProducts)

module.exports = router