module.exports = function(sequelize, DataTypes){
    const alias = 'CartProduct'
    const cols = {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER
        },
        cart_user_id: {
            type: DataTypes.INTEGER
        },
        date_added: {
            type: DataTypes.DATE
        },
        product_quantity: {
            type: DataTypes.INTEGER
        }
    }
    const config = {
        timestamps: false,
        tableName: 'cart_product'
    }

    const CartProduct = sequelize.define(alias, cols, config);

    CartProduct.associate = function(models){

        //Un cart user pertenece a un usuario
        CartProduct.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id',
            targetKey: 'id'
        })

        CartProduct.belongsTo(models.CartUser, {
            as: 'cart_user',
            foreignKey: 'cart_user_id',
            targetKey: 'id'
        })
       
    }
    return CartProduct
}