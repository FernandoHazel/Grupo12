const express = require("express")
const productosController = require("../controllers/productosController")


const router = express.Router()

router.get("/", (req, res)=>{
   res.send("Productos")
})
router.get("/crear", productosController.crear)
router.get("/detalles", productosController.detalles)
router.get("/editar/:id?", productosController.editar)
router.get("/categoria/:id?", productosController.categoria)
router.get("/all", productosController.all)
router.get("/offerts", productosController.offerts)
module.exports = router