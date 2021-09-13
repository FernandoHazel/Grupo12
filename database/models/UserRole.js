module.exports = function(sequelize, DataTypes){
    const alias = 'UserRole'
    const cols = {
        id: {
            type: DataTypes.INTEGER, //En la base es smallint(2)
            primaryKey: true,
            autoIncrement: true
        },
        user_role: {
            type: DataTypes.STRING(50)
        }
    }
    const config = {
        timestamps: false,
        tableName: 'users_roles'
    }

    const UserRole = sequelize.define(alias, cols, config);
    return UserRole
}