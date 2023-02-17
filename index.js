const express=require('express');
const app=express();
const fs=require('fs');
const path=require('path');
const bodyParser=require("body-parser");
var ejs = require('ejs');
let data=require("./data/person.json");
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
let MialibreriaMatteo=require('./cognome.js');
app.use(bodyParser.urlencoded({extended:false}));

app.get('/json',function(req,res){
        res.sendFile(__dirname+"/data/person.json")
})


app.get('/',function(req,res){
    res.render('home',{
        topicHead : '',
       
    });
    console.log('user accessing Home page');
});

app.get('/p',function(req,res){
res.render('table', { data: data });
});

app.post('/p',function(req,res){
res.render('table', { data: data });
});

app.post('/t',function(req,res){
    res.render('form',{
        topicHead : '',
       
    });
    console.log('user accessing Home page');
});

app.post('/scrivi',function(req,res){
 
let elemento={
  Nome:req.body.Nome,
  Data:req.body.Data,
  Nickname:req.body.Nickname
}
  
console.log(elemento)
let data = fs.readFileSync('./data/person.json');
let jsonData = JSON.parse(data);
MialibreriaMatteo.InserisciElemento(jsonData, elemento)
jsonData.push(elemento);
fs.writeFileSync('./data/person.json', JSON.stringify(jsonData));
  
});

app.listen(8080);
