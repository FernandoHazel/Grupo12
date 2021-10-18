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
const validateLogin =require("../middlewares/validateLogin")




/* GUEST */
/* Registro */
router.get('/signup', guestMiddleware, usersController.registroForm)
//Debemos pasar validateRegister despues de multer para que no haya problemas
//, multerUsuario.single('img')
//,guestMiddleware
router.post('/signup',multerUsuario.single('img'),validateRegister,  usersController.add)

//Emails en bd
router.get("/signup/emails",guestMiddleware, usersController.listEmail)

/* Login */
router.get('/login', guestMiddleware,  usersController.loginForm)
router.post('/login', guestMiddleware, validateLogin, usersController.login)

/* USERS AUTENTICADOS: requiere autenticacion */
/* Perfil */
router.get('/perfil', authUserMiddleware,  usersController.perfil)
/* Editar perfil */
router.get('/edit', authUserMiddleware, usersController.edit)
router.put('/modify', multerUsuario.single('img'), usersController.modify)
/* Cambiar contraseña */
router.get('/changePasswordForm', authUserMiddleware, usersController.changePasswordForm)
router.put('/changePassword', usersController.changePassword)
/* Borrar perfil */
router.get('/delete', authUserMiddleware, function(req, res){res.send('Aquí se borra el perfil')})
/* Logout */
router.get('/logout', authUserMiddleware, usersController.logout)

/* USER CLIENTE: requiere autenticacion */
router.get('/carrito', customerAuthMiddleware, carritoController.carrito)

//******* Añadir a carrito ********/
router.post("/add-carrito/:id",customerAuthMiddleware, carritoController.anadirCarrito)
router.get("/buy-cart",customerAuthMiddleware, carritoController.buyCart)
router.delete("/borrar-carrito", customerAuthMiddleware, carritoController.borrar)
router.get("/ticket/:id",customerAuthMiddleware, usersController.getClientTicket)

/* VENDEDOR: requiere autenticacion  */
/* ventas del vendedor */
router.get("/seller/sales", sellerAuthMiddleware, usersController.getAllSellerSales)



/* ADMIN */
router.get("/admin/active_users/:type", adminAuthMiddleware, usersController.getAllUsers)
router.delete("/delete/:id", adminAuthMiddleware, usersController.deleteAccount)
router.delete("/delete/user", usersController.deleteAccountUser)
router.delete("/activate/:id", adminAuthMiddleware, usersController.activateAccount)

module.exports = router