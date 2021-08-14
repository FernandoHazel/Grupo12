let express=require('express')
let mainController=require('../controllers/mainController.js')
let router =express.Router();
let userMidleware = require('../middlewares/userMiddleware')
const usersController = require("../controllers/usersController")
const multerUsuario = require('../config/multerUsuario')


router.get('/', mainController.home)

router.get('/login',  mainController.ingreso)

router.get('/signup', mainController.registro)

module.exports=router