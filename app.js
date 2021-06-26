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
app.use('/test', express.static(__dirname +'/Test'))
app.use('/images', express.static(__dirname +'/Images'))

// pagina de inicio
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/Views/home.html')
})

app.get('/carrito', (req, res)=>{
    res.sendFile(__dirname + '/Views/carrito.html')
})

app.get('/detalles', (req, res)=>{
    res.sendFile(__dirname + '/Views/detalles.html')
})

app.get('/test', (req, res)=>{
    res.sendFile(__dirname + '/Test/footer_header.html')
})