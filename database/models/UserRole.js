module.exports = function(sequelize, DataTypes){
    const alias = 'UserRole'
    const cols = {
        id: {
            type: DataTypes.INTEGER,
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
    
    
    UserRole.associate = function(models){
        //Un rol tiene muchos usuarios
        UserRole.hasMany(models.User, {
            as: 'users',
            foreignKey: 'user_role_id',
            sourceKey: 'id'
        })

    }
    return UserRole
}