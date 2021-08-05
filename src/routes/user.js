const express = require("express")
const usersController = require("../controllers/usersController")
const multerUsuario = require('../config/multerUsuario')

const router = express.Router()

router.post('/agregar',  multerUsuario.single('img') , usersController.add)

router.post('/login', usersController.login)

module.exports = router