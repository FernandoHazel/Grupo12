const multer = require('multer')
const path = require("path")

//****subiendo una imágen ******/
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        const category = req.body.category
        cb (null, 'public/images/usuarios/')
    },
    filename: function (req, file, cb){
        cb (null, "img-"+ Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage
});

module.exports = upload;