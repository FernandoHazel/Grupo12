const {body}= require('express-validator')

let validateRegister=[

body('nameF')
.notEmpty().withMessage('Debes completar el nombre').bail()
.isLength({min:2,max:50}).withMessage('El nombre deberá tener al menos dos caracteres')

]

module.exports=validateRegister