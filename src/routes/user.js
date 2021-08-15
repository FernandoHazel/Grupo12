const express = require("express")
const usersController = require("../controllers/usersController")
const multerUsuario = require('../config/multerUsuario')
const router = express.Router()
const guestMiddleware = require("../middlewares/guestMiddleware")
const authUserMiddleware = require("../middlewares/authUserMiddleware")

/* Registro */
router.get('/signup', guestMiddleware, usersController.registroForm)
router.post('/signup',  multerUsuario.single('img') , usersController.add)

/* Login */
router.get('/login', guestMiddleware,  usersController.loginForm)
router.post('/login', usersController.login)

/* Logout */
router.get('/logout', authUserMiddleware, usersController.logout)

/* Carrtito */
router.get('/carrito', usersController.carrito)


module.exports = router