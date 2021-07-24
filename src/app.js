const express = require("express")
const app = express()

const rutaMain =require('./routes/main.js')
const rutaProductos = require("./routes/productos")
const path = require("path")


// creando una dirección estática
app.use("/", express.static(__dirname+'/../public'))

//Configurar ejs como el template engine de la app
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Recursos
app.use('/',rutaMain);
app.use("/productos", rutaProductos);



// Puerto
const PORT = 3031

// levantar servidor
app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`)
})
