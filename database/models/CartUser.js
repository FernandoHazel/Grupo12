module.exports = function(sequelize, DataTypes){
    const alias = 'CartUser'
    const cols = {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER
        }
    }
    const config = {
        timestamps: false,
        tableName: 'cart_user'
    }

    const CartUser = sequelize.define(alias, cols, config);
    return CartUser
}