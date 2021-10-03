module.exports = function(sequelize, DataTypes){
    const alias = 'User'
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING
        },
        pass: {
            type: DataTypes.STRING
        },
        user_role_id: {
            type: DataTypes.INTEGER
        },
        active: {
            type: DataTypes.BOOLEAN
        },
    }
    const config = {
        timestamps: false,
        tableName: 'users'
    }

    const User = sequelize.define(alias, cols, config);
    
    User.associate = function(models){

        //Un usuario tiene un rol
        User.belongsTo(models.UserRole, {
            as: 'role',
            foreignKey: 'user_role_id',
            targetKey: 'id'
        }),
        //Un usuario tiene una información
        User.hasOne(models.UserInfo, {
            as: 'user_info',
            foreignKey: 'user_id',
            sourceKey: 'id'
        }),
        //Un usuario puede tener varios tickets
        User.hasMany(models.Ticket, {
            as: 'tickets',
            foreignKey: 'user_id',
            sourceKey: 'id'
        }),
        //Un usuario tiene un carrito de compras
        User.hasOne(models.CartUser, {
            as: 'cart_user',
            foreignKey: 'user_id',
            sourceKey: 'id'
        }),
        //Un usuario "seller" tiene muchos productos para vender
        User.hasMany(models.Product, {
            as: 'products_to_sell',
            foreignKey: 'seller_id',
            sourceKey: 'id'
        })
    }
    
    return User
}