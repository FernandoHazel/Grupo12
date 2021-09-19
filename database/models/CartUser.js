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

    //Un cart user pertenece a un usuario
    CartUser.associate = function(modelos){
        CartUser.belongsTo(modelos.User, {
            as: 'user_of_cart',
            foreingKey: 'user_id'
        })
    }

    //Un carrito puede tener muchos productos (N:M) a travez de cart_product
    CartUser.associate = function(modelos){
        CartUser.belongsToMany(modelos.Product, {
            as: 'added_products',
            through: 'cart_user',
            foreingKey: 'cart_user_id',
            otherKey: 'product_id'
        })
    }

    return CartUser
}