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

    User.associate = function(modelos){
        User.belongsTo(modelos.UserRole, {
            as: 'role',
            foreingKey: 'user_role_id'
        })
    }

    return User
}