const products = require("./products")
const users = require("./users")

const express = require("express")
const db = require("../../../database/models")


router = express.Router()

router.use("/users", users)
router.use("/products", products)
router.get("/totals", getTotal)


function getTotal(req, res){
    db.Product.count({
        distinct: true,
        col: 'Product.id'
      })
      .then(function(countP) {
          db.Category.count({
            distinct: true,
            col: 'Category.id'
          }).then(function(countC){
            db.User.count({
                distinct: true,
                col: 'User.id'
            }).then(function(countU){
                let response = {
                    "users": countU,
                    "products": countP,
                    "categories": countC
                }
                res.status(200).json(response)
            })
            .catch(function(e){
                res.status(500).json({"message": "Something went wrong "+e})
            })
          })
          .catch(function(e){
            res.status(500).json({"message": "Something went wrong "+e})
          })
      })
      .catch(function(e){
        res.status(500).json({"message": "Something went wrong "+e})
      })
}
module.exports=router