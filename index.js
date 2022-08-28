var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var admin=require('./routes/adminRoute')
var user=require('./routes/userRoute')
var db = require('./models');
const e = require('express');
var http = require('http').Server(app);
var router = express.Router();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'GET');
        return res.status(200).json({});
    }
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(upload.array());
app.use("/pictures",express.static('uploads'));

app.use("/manuals",express.static('manuals'));
app.get('/sync', function(req, res) {
    db.sequelize.sync({ forced: true, logging: console.log }).then(res.json({ "completed": "true" }).catch(async data => await console.log("kkkkkkkkkkkkkkkk" + data)));
});
app.get('/drop', function(req, res) {
    db.sequelize.drop().then(async data => await res.send("completed")).catch(err => console.log("error" + err));
})


 
app.use('/api/admin/',admin)
app.use('/api/user',user)
app.post("/loginGoogle",(req,res,next)=>{

db.User.findAll({
   where:{ email:req.body.email}
}).then(t0=>{

    if(t0.length>0){
        console.log("customer exist")
        res.send({success:true,id:t0[0].dataValues.id,loginSuccess:true,user:{givenName:t0[0].dataValues.givenName,
            email:t0[0].dataValues.email,name:t0[0].dataValues.name,imageUrl:t0[0].dataValues.imageUrl,lastName:t0[0].dataValues.familyName}}) 
    }else{

        db.User.create({
            ...req.body
        }).then(t1=>{
            console.log(t1.dataValues.id)
             res.send({success:true,id:t1.dataValues.id,loginSuccess:true,user:{givenName:t1.dataValues.givenName,
                 email:t1.dataValues.email,name:t1.dataValues.name,imageUrl:t1.dataValues.imageUrl,lastName:t1.dataValues.familyName}}) 

            console.log(t1)
        }).catch(error=>{
            console.log(error)
        })
    }
    console.log("üser exist ",t0)
})

    // console.log(req.body)
})



app.get("/customer",(req,res,next)=>{
db.User.findAll({

}).then(t0=>{
    res.send(t0)
}).catch(err=>{
    res.send(err)
})


})
app.listen(355,()=>{
    console.log("started the server on http://localhost:355")
})