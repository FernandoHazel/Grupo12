module.exports = function(sequelize, DataTypes){
    const alias = 'UserInfo'
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.INTEGER //en la base dice smallint(2)
        },
        profile_img: {
            type: DataTypes.STRING(500)
        }
    }
    const config = {
        timestamps: false,
        tableName: 'users_info'
    }

    const UserInfo = sequelize.define(alias, cols, config);
    return UserInfo
}