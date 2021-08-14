const express = require("express")
const usersController = require("../controllers/usersController")
const multerUsuario = require('../config/multerUsuario')
let mainController=require('../controllers/mainController.js')

const router = express.Router()

router.post('/signup',  multerUsuario.single('img') , usersController.add)

router.post('/login', usersController.login)

router.get('/carrito', mainController.carrito)

module.exports = router