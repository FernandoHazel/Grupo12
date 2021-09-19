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

    //Un producto pertenece a una categoría
    Product.associate = function(models){
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id',
            targetKey: 'id'
        })
    }

    //Un producto a vender pertenece a un vendedor
    Product.associate = function(models){
        Product.belongsTo(models.User, {
            as: 'seller',
            foreignKey: 'seller_id',
            targetKey: 'id'
        })
    }

    //Un producto puede estar en muchos carritos (N:M) a travéz de cart_product
    Product.associate = function(models){
        Product.belongsToMany(models.CartUser, {
            as: 'cart_users',
            through: 'cart_product',
            foreignKey: 'product_id',
            otherKey: 'cart_user_id'
        })
    }

    //Un producto puede estar en muchos tickets (N:M) a traves de purchases
    Product.associate = function(models){
        Product.belongsToMany(models.Ticket, {
            as: 'product_tickets',
            through: 'purchases',
            foreignKey: 'product_id',
            otherKey: 'ticket_id'
        })
    }
    
    return Product
}