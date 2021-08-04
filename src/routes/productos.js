const express = require("express")
const productosController = require("../controllers/productosController")
const multerIMG = require('../config/multerIMG')

const router = express.Router()

router.get("/", (req, res)=>{
   res.send("Productos")
})

router.get("/detalles/:id?", productosController.detalles)

//*******crear producto ********/
router.get("/crear", productosController.crear)
router.post("/crear", multerIMG.single('img'), productosController.store)

//*******editar producto ********/
router.get("/editar/:id", productosController.editForm)
router.put("/editar/:id", multerIMG.single('img'), productosController.actualizar)

//*******borrar producto ********/
router.delete("/:id", productosController.borrar)

router.get("/categoria/:id?", productosController.categoria)
router.get("/all", productosController.all)
router.get("/offerts", productosController.offerts)
module.exports = router