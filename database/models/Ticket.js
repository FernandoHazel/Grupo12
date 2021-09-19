module.exports = function(sequelize, DataTypes){
    const alias = 'Ticket'
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        purchase_date: {
            type: DataTypes.DATE
        },
        total_price: {
            type: DataTypes.DECIMAL(8,2) // ¿no sería flotante?
        }

    }
    const config = {
        timestamps: false,
        tableName: 'tickets'
    }

    const Ticket = sequelize.define(alias, cols, config);

    //Un ticket pertenece a un usuario
    Ticket.associate = function(modelos){
        Ticket.belongsTo(modelos.User, {
            as: 'ticket_user',
            foreingKey: 'user_id'
        })
    }
    
    //Un ticket puede tener muchos productos (N:M) a traves de purchases
    Product.associate = function(models){
        Product.belongsToMany(models.Ticket, {
            as: 'ticket_products',
            through: 'purchases',
            foreignKey: 'ticket_id',
            otherKey: 'product_id'
        })
    }

    return Ticket
}