const express = require("express")
const usersController = require("../controllers/usersController")
const multerUsuario = require('../config/multerUsuario')
const router = express.Router()
const guestMiddleware = require("../middlewares/guestMiddleware")
const authUserMiddleware = require("../middlewares/authUserMiddleware")
const carritoController = require("../controllers/carritoController")

/* GUEST */
/* Registro */
router.get('/signup', guestMiddleware, usersController.registroForm)
router.post('/signup',  multerUsuario.single('img') , usersController.add)
/* Login */
router.get('/login', guestMiddleware,  usersController.loginForm)
router.post('/login', usersController.login)

/* USERS AUTENTICADOS: requiere autenticacion */
/* Perfil */
router.get('/perfil', authUserMiddleware,  usersController.perfil)
/* Logout */
router.get('/logout', authUserMiddleware, usersController.logout)

/* USER CLIENTE: requiere autenticacion */
router.get('/carrito', carritoController.carrito)
//******* Añadir a carrito ********/
router.post("/AnadirCarrito/:id",carritoController.anadirCarrito)
router.delete("borrarProductoCarrito/:id", carritoController.borrarProducto)
router.get("/ticket/:id", usersController.getClientTicket)

/* VENDEDOR: requiere autenticacion  */
/* ventas del vendedor */
router.get("/seller/sales", usersController.getAllSellerSales)

module.exports = router