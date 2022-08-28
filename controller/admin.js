const db = require('../models')
const sequelize = require('sequelize')
const JWT = require('../authentication/JWT')
const fs = require('fs')

module.exports = {
    createAdmin: (req, res) => {
        db.Admin.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }).then(
            function (dat) {
                var token = JWT.createToken(req.body.name, dat.dataValues.ID, req.body.email)
                res.json([{ success: 1, error: 0, token }])
            }
        ).catch(function (err) {
            res.json(message(0, err))
        })
    }
    ,
    newCategory: (req, res) => {
        db.Category.create({
            name: req.body.name,
            description: req.body.description
        }).then(res.json(message(1, "created successfully"))).catch(function (err) {
            res.json(message(0, err))
        })
    },
    newSubCategory: (req, res) => {
        db.SubCategory.create({
            name: req.body.name,
            description: req.body.description,
            CategoryId: req.body.categoryId
        }).then(res.json(message(1, "created successfully"))).catch(function (err) {
            res.json(message(0, err))
        })
    },
    newProduct: (req, res) => {
        db.Product.create({
            name: req.body.name,
            SubCategoryId: req.body.subCategory
        }).then(res.json(message(1, "created successfully"))).catch(function (err) {
            res.json(message(0, err))
        })
    },
    newItem: (req, res) => {

        console.log("new item ",req.body)

        const file = req.files
        db.Item.create({
            name: req.body.name,
            ProductId: req.body.product,
            description: req.body.description,
            photos: file.length,
            quantity:req.body.quantity
        }).then((data) => {
            db.ItemPrice.create({
                price: req.body.price,
                ItemId: data.dataValues.id
            }).then(() => {
               console.log(req.body.featured)
                if (req.body.featured === 'true') {
                    console.log("lkkkkkk"+JSON.stringify(data.dataValues)+"fffffffff"+req.body.featured)
                    db.Featured.create({
                        ItemId: data.dataValues.id
                    }).then(() => {
                        for (var i = 1; i <= file.length; i++) {
                            fs.writeFile("uploads/" + data.dataValues.id + "photo" + i + ".jpg", file[i-1].buffer, function (err) {
                                if (err) {
                                    return console.log(err);
                                }
                                console.log("The file was saved!");
                            });

                        };
                        const chips=JSON.parse(req.body.chips)
                        for(var i=0;i<chips.length;i++){
                            db.ItemTags.create({
                                ItemId:data.dataValues.id,
                                TagId:chips[i].id
                            }).then(console.log("completed tags"))
                        }
                    
                        ; res.json(message(1, "created successfully"))
                    }).catch((err)=>{console.log(err)})
                } else {
                    res.json(message(1, "created successfully"))
                }
            })
        }
        ).catch(function (err) {
            res.json(message(0, err))
        })
    },
    addPrice: (req, res) => {
        db.ItemPrice.create({
            price: req.body.price,
            ItemId: req.body.itemid
        }).then(res.json(message(1, "created successfully"))).catch(function (err) {
            res.json(message(0, err))
        })
    },
    listCategory: (req, res) => {
        db.Category.findAll({
            include: [{ model: db.SubCategory, include: [db.Product] }]
        }).then((data) => res.json(data)).catch(function (err) {
            res.json(message(0, err))
        })
    },
    listSubCategory: (req, res) => {
        db.SubCategory.findAll(
            {
                where: {
                    CategoryId: req.body.CategoryId
                }, include: [db.Category]
            }
        ).then((data) => res.json(data)).catch(function (err) {
            res.json(message(0, err))
        })
    },
    addTag:(req,res)=>{
        db.Tags.create({
            name:req.body.name
        }).then(res.json(message(1, "created successfully"))).catch(function (err) {
            res.json(message(0, err))
        })
    },
    listTags:(req,res)=>{
        db.Tags.findAll().then((data)=>{res.json(data)})
    },
    listItems:(req,res)=>{
        db.Item.findAll().then((data)=>{res.json(data)}).catch(function (err) {
            res.json(message(0, err))
        })
    },
    fetchSlides:(req,res)=>{
        db.Slide.findAll(
        {
            include:[{model:db.Item}]
        }
        ).then((data)=>{res.json(data)}).catch(function (err) {
            res.json(message(0, err))
        })
    },
    addSlides:(req,res)=>{
        if(!req.body.bool){
            db.Slide.create({
                ItemId:req.body.itemid
            }).then(res.json(message(1, "created successfully"))).catch(function (err) {
                res.json(message(0, err))
            })
        }else{
            db.Slide.destroy({where:{
                id:req.body.itemid
            }}).then(res.json("meh"))
        }
        
    },addSparePart:(req,res)=>{
        db.SparePart.create({
            name:req.body.name,
            description:req.body.description
        }).then(res.json([{success:1,error:0,message:'sparepart created successfully'}])).catch(function (err) {
            res.json(message(0, err))
        })
    },
    addManual:(req,res)=>{
        const file=req.files
        console.log(file)
        db.Manual.create({
            name:req.body.name,
            description:req.body.description
        }).then((data)=>{
            fs.writeFile("manuals/" + data.dataValues.id + "manual.pdf", file[0].buffer, function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
            res.json([{error:0,success:1,message:'saved file'}])
        })

    },
    getAllProductList:(req,res,next)=>{
console.log("product request ")
        db.Item.findAll({
            
        }).then(t0=>{
res.send(t0)
        }).catch(error=>{
            next(error)
        })
    }


}

function message(bool, message) {
    const success = [{ success: bool, error: !bool, message: message }]
    return success;
}