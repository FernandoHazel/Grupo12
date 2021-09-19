module.exports = function(sequelize, DataTypes){
    const alias = 'User'
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING
        },
        pass: {
            type: DataTypes.STRING
        },
        user_role_id: {
            type: DataTypes.INTEGER //en la base dice smallint(2)
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

    //Un usuario tiene un rol
    User.associate = function(modelos){
        User.belongsTo(modelos.UserRole, {
            as: 'role',
            foreingKey: 'user_role_id'
        })
    }
    //Un usuario tiene una información
    User.associate = function(modelos){
        User.belongsTo(modelos.UserInfo, {
            as: 'user_info',
            foreingKey: 'user_id'
        })
    }
    //Un usuario puede tener varios tickets
    User.associate = function(modelos){
        User.hasMany(modelos.Ticket, {
            as: 'tickets',
            foreingKey: 'user_id'
        })
    }
    //Un usuario tiene un carrito de compras
    User.associate = function(modelos){
        User.belongsTo(modelos.CartUser, {
            as: 'cart_user',
            foreingKey: 'user_id'
        })
    }

    //Un usuario "seller" tiene muchos productos para vender
    User.associate = function(modelos){
        User.hasMany(modelos.Product, {
            as: 'products_to_sell',
            foreingKey: 'seller_id'
        })
    }

    return User
}