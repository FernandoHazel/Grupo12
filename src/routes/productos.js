const express = require("express")
const productosController = require("../controllers/productosController")
const multerIMG = require('../config/multerIMG')

const sellerAuthMiddleware = require("../middlewares/sellerAuthMiddleware")
const customerAuthMiddleware = require("../middlewares/customerAuthMiddleware")

const router = express.Router()
const validateProduct =require("../middlewares/validateProduct")

//******* redirecciona a todos los productos ********/
router.get("/", (req, res)=>{
   res.redirect("/productos/all")
})

/********** ENDPOINT PUBLICOS *******/
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


/******** REQUIERE AUTENTICACION DE CLIENTE ****************/
router.post("/buy-product/:id", customerAuthMiddleware, productosController.buy)


/******** REQUIERE AUTENTICACION DE VENDEDOR ****************/
//******* crear producto ********/
router.get("/crear", sellerAuthMiddleware, productosController.crear)
router.post("/crear",sellerAuthMiddleware, multerIMG.single('img'),validateProduct, productosController.store)
//******* editar producto ********/
router.get("/editar/:id", sellerAuthMiddleware, productosController.editForm)
router.put("/editar/:id", sellerAuthMiddleware, multerIMG.single('img'),validateProduct, productosController.actualizar)
//******* borrar producto ********/
router.delete("/borrar/:id", sellerAuthMiddleware, productosController.borrar)
/* productos del vendedor */
router.get("/my-products/",sellerAuthMiddleware, productosController.getSellerProducts)

module.exports = router