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

    Ticket.associate = function(models){
        //Un ticket pertenece a un usuario
        Ticket.belongsTo(models.User, {
            as: 'ticket_user',
            foreignKey: 'user_id',
            targetKey: 'id'
        }),
        //Un ticket puede tener muchos productos (N:M) a traves de purchases
        Ticket.hasMany(models.Purchase, {
            as: 'ticket_purchases',
            foreignKey: 'ticket_id',
            sourceKey: 'id'
        })
    }

    return Ticket
}