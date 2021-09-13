module.exports = function(sequelize, DataTypes){
    const alias = 'Purchase'
    const cols = {
        id: {
            type: DataTypes.BIGINT(20),
            primaryKey: true,
            autoIncrement: true
        },
        ticket_id: {
            type: DataTypes.INTEGER
        },
        product_id: {
            type: DataTypes.INTEGER
        },
        individual_price: {
            type: DataTypes.DECIMAL(8,2) //¿no sería flotante?
        },
        product_quantity: {
            type: DataTypes.INTEGER
        }

    }
    const config = {
        timestamps: false,
        tableName: 'purchases'
    }

    const Purchase = sequelize.define(alias, cols, config);
    return Purchase
}