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
    Purchase.associate = function(models){
        //Un ticket pertenece a un usuario
        Purchase.belongsTo(models.Ticket, {
            as: 'ticket',
            foreignKey: 'ticket_id',
            targetKey: 'id'

        }),
        //Un ticket puede tener muchos productos (N:M) a traves de purchases
        Purchase.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'product_id',
            targetKey: 'id'
        })
    }

    return Purchase
}