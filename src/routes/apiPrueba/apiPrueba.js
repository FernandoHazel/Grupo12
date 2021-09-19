let express=require('express')
let apiPruebaController = require('../../controllers/apiPrueba/apiPruebaController.js');
let router =express.Router();

//ruta para hacer consultas de prueba
router.get('/show', apiPruebaController.show)

router.post('/create', apiPruebaController.create)
router.delete('/destroy/:id', apiPruebaController.destroy)

module.exports = router