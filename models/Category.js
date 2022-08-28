const { Model } = require('sequelize')
module.exports=(sequelize,DataTypes)=>{
    class Category extends Model{
        static associate(Models){
            Category.hasMany(Models.SubCategory)
        }
    }
    Category.init({
        name:DataTypes.STRING,
        description:DataTypes.STRING,
    },{
        sequelize,
        modelName:'Category'
    }
    )
    return Category
}
