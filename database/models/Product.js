module.exports = function(sequelize, DataTypes){
    const alias = 'Product'
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        category_id: {
            type: DataTypes.INTEGER //en la base dice smallint(2)
        },
        seller_id: {
            type: DataTypes.INTEGER
        },
        title: {
            type: DataTypes.STRING 
        },
        description: {
            type: DataTypes.TEXT
        },
        price: {
            type: DataTypes.DECIMAL(8,2)
        },
        stock: {
            type: DataTypes.INTEGER
        },
        img: {
            type: DataTypes.STRING
        },
        discount: {
            type: DataTypes.INTEGER //en la base dice smallint(2)
        },
        active: {
            type: DataTypes.INTEGER
        },
        sold_units: {
            type: DataTypes.INTEGER
        }
        
    }
    const config = {
        timestamps: false,
        tableName: 'products'
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){

        //Un producto puede estar en muchos carritos (N:M) a travéz de cart_product
        Product.belongsToMany(models.CartUser, {
            as: 'cart_users',
            through: 'cart_product',
            foreignKey: 'product_id',
            otherKey: 'cart_user_id',
            timestamps: false
        }),
        //Un producto puede estar en muchos tickets (N:M) a traves de purchases
        Product.hasMany(models.Purchase, {
            as: 'product_tickets',
            foreignKey: 'product_id',
            sourceKey: 'id',
            timestamps: false
        }),
        //Un producto a vender pertenece a un vendedor
        Product.belongsTo(models.User, {
            as: 'seller',
            foreignKey: 'seller_id',
            targetKey: 'id'
        }),
        //Un producto pertenece a una categoría
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id',
            targetKey: 'id'
        })
    }

    return Product
}