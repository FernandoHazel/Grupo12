module.exports = function(sequelize, DataTypes){
    const alias = 'Category'
    const cols = {
        id: {
            type: DataTypes.INTEGER, //en la base dice smallint(2)
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        }
    }
    const config = {
        timestamps: false,
        tableName: 'categories'
    }

    const Category = sequelize.define(alias, cols, config);

    //Una categoría tiene muchos productos
    Category.associate = function(models){
        Category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'category_id',
            sourceKey: 'id'
        })
    }
    return Category
}