const { Model } = require('sequelize')
module.exports=(sequelize,DataTypes)=>{
    class SparePart extends Model{
        static associate(Models){
           // Tags.hasMany(Models.ItemTags)
        }
    }
    SparePart.init({
        name:DataTypes.STRING,
        description:DataTypes.STRING
    },{
        sequelize,
        modelName:'SparePart'
    }
    )
    return SparePart
}
