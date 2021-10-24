const {body}= require('express-validator')
const path = require("path")

const validateProduct=[

    body('title')
     .notEmpty().withMessage('Debes completar el nombre del producto').bail()
     .isLength({min:2}).withMessage('El nombre del producto deberá tener al menos dos caracteres'),
    
     body('category')
     .notEmpty().withMessage('Selecciona una opción'),

     body('description')
     .notEmpty().withMessage('Debes completar este campo').bail()
     .isLength({min:2}).withMessage('Ingresa al menos dos caracteres'),

     body('price')
     .notEmpty().withMessage('Debes completar este campo').bail()
     .isInt({min:1}).withMessage('Ingresa un precio'),
    
     body('discount')
     .notEmpty().withMessage('Debes completar este campo').bail()
     .isInt({min:0,max:100}).withMessage('Ingresa un descuento entre 0 y 100 %'),
  
     body('stock')
     .notEmpty().withMessage('Debes completar este campo').bail()
     .isInt({min:1}).withMessage('Ingresa una cantidad mínima de 1'),
      
     body('img')
     .custom((value,{req})=>{
         let fileImg=req.file
         let extensions= ['.jpg','.jpeg','.png','.gif','.PNG', '.JPG', '.JPEG', 'GIF']
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
module.exports=validateProduct