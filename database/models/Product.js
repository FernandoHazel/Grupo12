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
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id',
            targetKey: 'id'
        })
    }
    return Product
}