const express = require("express")
const usersController = require("../controllers/usersController")
const multerUsuario = require('../config/multerUsuario')
const router = express.Router()
const guestMiddleware = require("../middlewares/guestMiddleware")
const authUserMiddleware = require("../middlewares/authUserMiddleware")
const sellerAuthMiddleware = require("../middlewares/sellerAuthMiddleware")
const customerAuthMiddleware = require("../middlewares/customerAuthMiddleware")
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware")

const carritoController = require("../controllers/carritoController")
const validateRegister =require("../middlewares/validateRegister")




/* GUEST */
/* Registro */
router.get('/signup', guestMiddleware, usersController.registroForm)
//Debemos pasar validateRegister despues de multer para que no haya problemas
//, multerUsuario.single('img')
//,guestMiddleware
router.post('/signup',multerUsuario.single('img'),validateRegister,  usersController.add)

/* Login */
router.get('/login', guestMiddleware,  usersController.loginForm)
router.post('/login', guestMiddleware, usersController.login)

/* USERS AUTENTICADOS: requiere autenticacion */
/* Perfil */
router.get('/perfil', authUserMiddleware,  usersController.perfil)
/* Editar perfil */
router.get('/edit', authUserMiddleware, usersController.edit)
router.post('/modify', authUserMiddleware, usersController.modify)
/* Borrar perfil */
router.get('/delete', authUserMiddleware, function(req, res){res.send('Aquí se borra el perfil')})
/* Logout */
router.get('/logout', authUserMiddleware, usersController.logout)

/* USER CLIENTE: requiere autenticacion */
router.get('/carrito', customerAuthMiddleware, carritoController.carrito)

//******* Añadir a carrito ********/
router.post("/AnadirCarrito/:id",customerAuthMiddleware, carritoController.anadirCarrito)
router.delete("borrarProductoCarrito/:id", customerAuthMiddleware, carritoController.borrarProducto)
router.get("/ticket/:id",customerAuthMiddleware, usersController.getClientTicket)

/* VENDEDOR: requiere autenticacion  */
/* ventas del vendedor */
router.get("/seller/sales", sellerAuthMiddleware, usersController.getAllSellerSales)


/* ADMIN */
router.get("/admin/active_users/:type", adminAuthMiddleware, usersController.getAllUsers)

module.exports = router