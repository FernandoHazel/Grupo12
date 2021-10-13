const {body}= require('express-validator')

const validateRegister=[

    body('email')
     .notEmpty().withMessage('Debes completar el email').bail()
     .isEmail().withMessage('Ingresa un email valido'),
    
    
    body('password')
     .notEmpty().withMessage('Debes completar el password').bail(),
    ]

module.exports=validateRegister