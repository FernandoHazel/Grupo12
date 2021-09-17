let express=require('express')
let apiPruebaController = require('../../controllers/apiPrueba/apiPruebaController.js');
let router =express.Router();

router.post('/create', apiPruebaController.create)
router.put('/update/:id', apiPruebaController.modify)
router.delete('/destroy/:id', apiPruebaController.destroy)

module.exports = router