const express = require("express")
const usersController = require("../controllers/usersController")
const multerUsuario = require('../config/multerUsuario')
const router = express.Router()
const path = require("path")
const db= require('../../database/models')
const guestMiddleware = require("../middlewares/guestMiddleware")
const authUserMiddleware = require("../middlewares/authUserMiddleware")
const sellerAuthMiddleware = require("../middlewares/sellerAuthMiddleware")
const customerAuthMiddleware = require("../middlewares/customerAuthMiddleware")
const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware")

const carritoController = require("../controllers/carritoController")
//const validateRegister =require("../middlewares/validateRegister")
const {body}= require('express-validator')

const validateRegister=[

body('nameF')
 .notEmpty().withMessage('Debes completar el nombre').bail()
 .isLength({min:2}).withMessage('El nombre deberá tener al menos dos caracteres').bail()
 .isAlpha().withMessage('Solo debes ingresar letras'),

 body('apellido')
 .notEmpty().withMessage('Debes completar el apellido').bail()
 .isLength({min:2}).withMessage('El apellido deberá tener al menos dos caracteres').bail()
 .isAlpha().withMessage('Solo debes ingresar letras'),

body('release_date')
.custom((value,{req})=>{
    let date=value
    let year=Number(date.slice(0,4))
    let month=date.slice(5,7)
    let day=date.slice(8,10)
    function edadF(yearA) {
        let date= new Date()
        let yearPresent= date.getFullYear()
        let edad=yearPresent-yearA
        return edad
    }
    if(date==''){
        throw new Error('Ingresa su fecha de nacimiento')
    }else if(year<=1910) {
        throw new Error('Ingrese una fecha valida')
    }else if(edadF(year)<13){
        throw new Error('Debes tener mínimo 13 años')
    }
    
    return true
}),

body('email')
 .notEmpty().withMessage('Debes completar el email').bail()
 .isEmail().withMessage('Ingresa un email valido')
 .custom((value,{req})=>{

        return db.User.findOne({
            where:{email:value}
        })
      .then(user =>{
        if(user){
            return Promise.reject('Este email ya esta registrado, ingresa otro')
        }
      })
    
    
    
    
    
   
}),


body('profile')
 .notEmpty().withMessage('Debes seleccionar una opción'),

body('password')
 .notEmpty().withMessage('Debes completar el password').bail()
 .isLength({min:8}).withMessage('El password deberá tener al menos 8 caracteres').bail()
 .isStrongPassword({ minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})
 .withMessage('Debes ingresar mayúsculas,minúsculas, un número y un carácter especial'),

body('password2')
 .notEmpty().withMessage('Debes completar el password').bail()
 .isLength({min:8}).withMessage('El password deberá tener al menos 8 caracteres').bail()
 .isStrongPassword({ minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})
 .withMessage('Debes ingresar mayúsculas,minúsculas, un número y un carácter especial').bail()
 .custom((value,{req})=>{
    let password=req.body.password
    let password2=req.body.password2
    
    if(!(password2==password)){
       throw new Error('Los password no coinciden')
    }
    return true
}),

 body('img')
 .custom((value,{req})=>{
     let fileImg=req.file
     let extensions= ['.jpg','.jpeg','.png','.gif']
     if(!fileImg){
        throw new Error('Tienes que subir una imagen')
     }else{
        let fileExtension= path.extname(fileImg.originalname)
        if(!extensions.includes(fileExtension)){
            //console.log(fileExtension)
            throw new Error(`sube una imagen con extension ${extensions.join(',')}`)
        }
     }
     return true
 })


]

/* GUEST */
/* Registro */
router.get('/signup', guestMiddleware, usersController.registroForm)
//Debemos pasar validateRegister despues de multer para que no haya problemas
//, multerUsuario.single('img')
router.post('/signup',guestMiddleware,multerUsuario.single('img'),validateRegister,  usersController.add)

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