const express = require("express")
const app = express()

const rutaMain =require('./routes/main.js')







// creando una dirección estática
//app.use(express.static('./public'))
app.use("/", express.static(__dirname+'/../public'))

//Configurar ejs como el template engine de la app
app.set('view engine', 'ejs')


app.use('/',rutaMain);



// Puerto
const PORT = 3031

// levantar servidor
app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`)
})
