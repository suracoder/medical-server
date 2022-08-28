const { Model } = require('sequelize')

module.exports=(sequelize,DataTypes)=>{
    class Slide extends Model{
        static associate(Models){
           Slide.belongsTo(Models.Item)

        }
    }
    Slide.init({
        
    },{
        sequelize,
        modelName:'Slide'
    }
    )
    return Slide
}
