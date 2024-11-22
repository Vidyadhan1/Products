var express = require('express');
var mongoose = require('mongoose');
var db = require("./database/db.js")
//console.log(db);





db();

const Schema= mongoose.Schema;

const userschema = new Schema({
    name: String,
    price:Number,
    discount:Number
});
const userModel= mongoose.model("products",userschema)



var app = express(); 

app.use(express.json());  //send data in json format

app.get('/add',function(req,res){
    res.render('aduser.ejs');
});

app.get('/show',function(req,res){
    res.render('showuser.ejs');
});

app.get('/products',async function(req,res){
try{
    var result=await userModel.find();
    res.send(result);
}catch(err){
    res.send(err.message);
}
   
});

app.post('/products', async function(req,res){
//console.log(req.body);
try {
    var record=new userModel(req.body);
    var ans = await record.save();
    res.send("record inserted")
} catch (err) {
    res.send(err.message);
}

});

app.put('/products',function(req,res){
res.send("update data from database");
});

app.delete('/products',function(req,res){
res.send("delete data from database");
});



app.listen(9057);