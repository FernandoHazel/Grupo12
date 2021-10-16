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

    CartUser.associate = function(models){

        //Un cart user pertenece a un usuario
        CartUser.belongsTo(models.User, {
            as: 'user_of_cart',
            foreignKey: 'user_id',
            targetKey: 'id'
        }),
        //Un carrito puede tener muchos productos (N:M) a travez de cart_product
        CartUser.hasMany(models.CartProduct, {
            as: 'cart_products',
            foreignKey: 'cart_user_id',
            sourceKey: "id"
        })
    }

    return CartUser
}