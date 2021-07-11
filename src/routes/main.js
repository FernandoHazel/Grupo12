let express=require('express')
let mainController=require('../controllers/mainController.js')
let router =express.Router();

router.get('/', mainController.home)

router.get('/carrito',mainController.carrito)

router.get('/detalles',mainController.detalles)

router.get('/ingreso',mainController.ingreso)

router.get('/registro',mainController.registro)


module.exports=router