const express = require("express")
const app = express()

const rutaMain =require('./routes/main.js')
const rutaProductos = require("./routes/productos")
const path = require("path")
const override = require("method-override")

// Method override
app.use(override("_method"))

// creando una dirección estática
app.use("/", express.static(__dirname+'/../public'))

//Configurar ejs como el template engine de la app
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Recursos
app.use('/',rutaMain);
app.use("/productos", rutaProductos);

// Error 404
app.use(function(req, res, next) {
    res.status(404).render("errors/404")
});

// Puerto
const PORT = 3031

// levantar servidor
app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`)
})
