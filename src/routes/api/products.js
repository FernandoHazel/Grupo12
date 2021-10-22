const express = require("express")
router = express.Router()
const sequelize = require("sequelize")
const db = require("../../../database/models")

router.get("/all", allProducts)
router.get("/detail/:id",detail)


function allProducts(req, res){
    db.Product.findAll({
        include: [{association: "product_tickets", include: [{association: "ticket"}]}]
    })
    .then(function(products){

        let categories = {}
        db.Product.findAll({
            include: [{association: "category"}],
            group: ['category.id'],
            attributes: ['category.id', [sequelize.fn('COUNT', 'category.id'), 'stats']],
        })
        .then(function(categories_stats){
            /**** categories stats  *******/
            categories_stats.forEach(cs =>{
                categories[cs.category.name] =cs.dataValues.stats
            })

            let newProducts = []

            products.forEach(p => {
            // let real_price = p.discount > 0? (p.price - (p.price * p.discount / 100)):p.price
            let purchases = []
            
            /* product sales */
            p.product_tickets.forEach(tc =>{
               purchases.push({
                   sale_price: tc.individual_price,
                   unit_price: parseFloat((tc.individual_price/tc.product_quantity).toFixed(2)),
                   quantity: tc.product_quantity,
                   date: tc.ticket.purchase_date
               })
            })

            /* array of products */
            newProducts.push({
                id: p.id,
                name: p.title,
                description: p.description,
                detail: `http://localhost:3031/api/products/detail/${p.id}`, //faltaba escribir "/detail/"
                sales: purchases
                })
            });

            /* prepare the response */
            let response = {
                "count": newProducts.length,
                "countByCategory": categories,
                "products": newProducts
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
}

function detail(req, res){
    let id = req.params.id
    id = parseInt(id, 10)

    db.Product.findOne({
        include: [{association: "category"}, {association: "seller", include: [{association: "user_info"}]}],
        where: {
            id: id
        }

    }).then(function(product){
        if(product){

            db.Purchase.findAll({
                include: [{association: "ticket"}],
                where: {
                    product_id: product.id
                }
            }).then(function(p_purchases){
                let purchases = []
            
                /* product sales */
                p_purchases.forEach(tc =>{
                   purchases.push({
                       sale_price: tc.individual_price,
                       unit_price: parseFloat((tc.individual_price/tc.product_quantity).toFixed(2)),
                       quantity: tc.product_quantity,
                       date: tc.ticket.purchase_date
                   })
                })

                let real_price = product.discount > 0? (product.price - (product.price * product.discount / 100)):product.price

                let newProduct = {
                    name: product.title,
                    description: product.description,
                    price: product.price,
                    discount: product.discount,
                    real_price: real_price,
                    stock: product.stock,
                    active: product.active,
                    sold_units: product.sold_units,
                    category: product.category.name,
                    seller: {
                        name: product.seller.user_info.first_name,
                        last_name: product.seller.user_info.last_name,
                        email: product.seller.email
                    },
                    image: product.img?`http://localhost:3031${product.img}`:'',
                    sales: purchases
                }
                res.status(200).json(newProduct)
            }).catch(function(e){
                res.status(500).json({"message": "Something went wrong "+e})
            })
        }else{
            res.status(404).json({"message": "Product NOT found"})
        }
    })
    .catch(function(e){
        res.status(500).json({"message": "Something went wrong "+e})
    })
}

module.exports=router