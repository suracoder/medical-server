const db = require('../models')
const sequelize = require('sequelize')

module.exports = {
    FeaturedItems: (req, res) => {
        db.Featured.findAll({
            include: [{ model: db.Item, include: [db.ItemPrice] }]
        }).then((data) => { res.json(data) })
    },
    listCategory: (req, res) => {
        db.Category.findAll({
            include: [{ model: db.SubCategory, include: [db.Product] }]
        }).then((data) => res.json(data)).catch(function (err) {
            res.json(message(0, err))
        })
    },
    listSubCategory: (req, res) => {
        db.SubCategory.findByPk(req.body.id
            , { include: [{ model: db.Category, attrs: ['name', 'id'] }, db.Product] }

        ).then((data) => res.json(data)).catch(function (err) {
            res.json(message(0, err))
        })
    },
    CategoryContent: (req, res) => {
        db.Category.finAll({
            where: req.body.id,
            include: [{ model: db.Item, include: [db.ItemPrice] }]
        }).then((data) => { res.json(data) })

    },
    itemDetails: (req, res) => {
        db.Item.findByPk(req.body.id, {
            include: [db.ItemPrice, { model: db.Product, include: [{ model: db.SubCategory, include: [db.Category] }] }, { model: db.ItemTags, include: [db.Tags] }]
        }).then((dat) => { res.json(dat) })
    },
    listProduct: (req, res) => {
        db.Product.findByPk(req.body.id, {
            include: [{ model: db.Item, include: [db.ItemPrice] }, { model: db.SubCategory, attrs: ['id', 'name'], include: [{ model: db.Category, attrs: ['id', 'name'] }] }]
        }).then((dat) => { res.json(dat) })
    },
    listCategoryOnly: (req, res) => {
        db.Category.findByPk(req.body.id, {
            include: [db.SubCategory]
        }).then((dat) => { res.json(dat) })
    },
    searchItems: (req, res) => {
        const respdata = {}
        db.Item.findAll({
            where: {
                name: { [sequelize.Op.like]: '%' + req.body.key + '%' }
            }
        }).then((data) => {
            respdata.Items = data;
            db.Category.findAll({
                where: {
                    name: { [sequelize.Op.like]: '%' + req.body.key + '%' }
                }
            }).then((data) => {
                respdata.Categories = data;
                db.Product.findAll({
                    where: {
                        name: { [sequelize.Op.like]: '%' + req.body.key + '%' }
                    }
                }).then((data) => {
                    respdata.Products = data;
                    db.SubCategory.findAll({
                        where: {
                            name: { [sequelize.Op.like]: '%' + req.body.key + '%' }
                        }
                    }).then((data) => { respdata.SubCategory = data; res.json(respdata) })
                })


            })

        })

    },
    fetchSlides: (req, res) => {
        db.Slide.findAll(
            {
                include: [{ model: db.Item }]
            }
        ).then((data) => { res.json(data) }).catch(function (err) {
            res.json(message(0, err))
        })
    },
    fetchSparePart: (req, res) => {
        db.SparePart.findAll().then((data) => res.json(data)).catch(function (err) {
            res.json(message(0, err))
        })
    },
    searchSpare: (req, res) => {
        db.SparePart.findAll({
            where: {
                name: { [sequelize.Op.like]: '%' + req.body.key + '%' }
            }
        }).then((data) => res.json(data)).catch(function (err) {
            res.json(message(0, err))
        })
    },
    submitFeedback:(req,res)=>{
        db.Feedback.create({
            email:req.body.email,
            feedback:req.body.feedback
        }).then(res.json([{success:'1',error:'0',message:'success'}]))
    }
    ,loadManual:(req,res)=>{
        db.Manual.findAll().then((data)=>{res.json(data)})
    }

}

