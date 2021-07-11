const express = require("express")
const productosController = require("../controllers/productosController")


const router = express.Router()

router.get("/", (req, res)=>{
   res.send("Productos")
})
router.get("/crear", productosController.crear)
router.get("/detalles", productosController.detalles)

module.exports = router