let express=require('express')
let mainController=require('../controllers/mainController.js')
let router =express.Router();

router.get('/', mainController.home)

router.get('/carrito',mainController.carrito)

router.get('/login',mainController.ingreso)

router.get('/signup',mainController.registro)


module.exports=router