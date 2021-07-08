const express = require("express")
const app = express()

// Puerto
const PORT = 3031

// levantar servidor
app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`)
})

// creando una dirección estática
app.use("/", express.static(__dirname+'/../public'))

// pagina de inicio
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/views/home.html')
})
// carrito
app.get('/carrito', (req, res)=>{
    res.sendFile(__dirname + '/views/carrito.html')
})
// detalles producto
app.get('/detalles', (req, res)=>{
    res.sendFile(__dirname + '/views/detalles.html')
})

// formulario de registro
app.get('/registro', (req, res)=>{
    res.sendFile(__dirname + '/views/registro.html')
})

// formulario de Log in
app.get('/ingreso', (req, res)=>{
    res.sendFile(__dirname + '/views/ingreso.html')
})

