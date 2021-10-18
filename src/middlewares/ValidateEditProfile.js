const {body}= require('express-validator')
const path = require("path")
const db= require('../../database/models')

const validateEditProfile=[

    body('name')
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
        
        if(year<=1910) {
            throw new Error('Ingrese una fecha valida')
        }else if(edadF(year)<13){
            throw new Error('Debes tener mínimo 13 años')
        }
        return true
    }),
    
    
    body('img')
    .custom((value,{req})=>{
        let fileImg=req.file
        let extensions= ['.jpg','.jpeg','.png','.gif', '.PNG']
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
module.exports=validateEditProfile