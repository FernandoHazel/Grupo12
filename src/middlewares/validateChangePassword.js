const {body}= require('express-validator')
const path = require("path")
const db= require('../../database/models')

const validateChangePassword=[

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
    })
    
]
module.exports=validateChangePassword