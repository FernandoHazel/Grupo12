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

    return CartProduct
}