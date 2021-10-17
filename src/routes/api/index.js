const products = require("./products")
const users = require("./users")

const express = require("express")


router = express.Router()

router.use("/users", users)
router.use("/products", products)

module.exports=router