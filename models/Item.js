const { Model } = require('sequelize')

module.exports=(sequelize,DataTypes)=>{
    class Item extends Model{
        static associate(Models){
            Item.belongsTo(Models.Product)
            Item.hasOne(Models.ItemPrice)
            Item.hasMany(Models.ItemTags)
        }
    }
    Item.init({
        name:DataTypes.STRING,
        description:DataTypes.STRING,
        quantity:DataTypes.INTEGER,
        photos:DataTypes.INTEGER,
        // price:DataTypes.DOUBLE
        
    },{
        sequelize,
        modelName:'Item'
    }
    )
    return Item
}
