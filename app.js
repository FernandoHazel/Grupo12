const express = require("express")
const app = express()

// Puerto
const PORT = 3031

// levantar servidor
app.listen(PORT, ()=>{
    console.log("Server running on http://localhost:"+PORT)
})

//creando una dirección estática
app.use('/static', express.static(__dirname +'/Public'))

// pagina de inicio
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/Views/home.html')
})
// carrito
app.get('/carrito', (req, res)=>{
    res.sendFile(__dirname + '/Views/carrito.html')
})
// detalles producto
app.get('/detalles', (req, res)=>{
    res.sendFile(__dirname + '/Views/detalles.html')
})

// formulario de registro
app.get('/registro', (req, res)=>{
    res.sendFile(__dirname + '/Views/registro.html')
})

// para pruebas
app.get('/test', (req, res)=>{
    res.sendFile(__dirname + '/Test/footer_header.html')
})