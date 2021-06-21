const express = require("express")
const app = express()

// Puerto
const PORT = 3031

// levantar servidor
app.listen(PORT, ()=>{
    console.log("Server running on http://localhost:"+PORT)
})

// pagina de inicio
app.get("/", (req, res)=>{
    res.send("Bienvenido a TechnoShop :)")
})