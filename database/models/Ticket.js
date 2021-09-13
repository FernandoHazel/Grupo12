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
    return Ticket
}