const { Model } = require('sequelize')
module.exports=(sequelize,DataTypes)=>{
    class Manual extends Model{
        static associate(Models){
        }
    }
    Manual.init({
        name:DataTypes.STRING,
        description:DataTypes.STRING
    },{
        sequelize,
        modelName:'Manual'
    }
    )
    return Manual
}
