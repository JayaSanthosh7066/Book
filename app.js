const express=require("express");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");
var ejs=require('ejs');
d=0;
mongoose.connect("mongodb://127.0.0.1:27017/BookLobe",{useNewUrlParser: true});
const nodema=require("nodemailer");
const transport=nodema.createTransport({
    service:"gmail",
    auth:{
        user:"jayasanthoshamalakanti@gmail.com",
        pass:"jgsbgrshlcoxneqc"
    }
});
const li=new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: String
})
const app=express();
var c=0;
app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended: true}));
const list=mongoose.model("detail",li);
app.post("/signup",function(req,res)
{
    // res.render('signup',c);
    res.redirect("/signup");
})
app.get("/signup",function(req,res)
{
    res.render('signup',{c:0});
})
app.get("/log",function(req,res)
{
    var name2=req.body.name1;
    var email=req.body.email;
    var phone=req.body.phone;
    var pass=req.body.pass;
    if(email.includes("@gmail.com")==false)
    {
        c=1;
        console.log(c+" Hello");
        res.render("signup",{c:1});
    }
})
app.get("/login",function(req,res)
{
    res.render("login",{c:0});
})
app.post("/login",function(req,res)
{
    res.render("login",{c:0});
})
app.post("/logi",function(req,res)
{
    var email1=req.body.emaili;
    var password1=req.body.name2;
    list.find({email:email1,password:password1}).then(function(docs)
    {
        if(docs.length>0)
        {
            d++;
            res.redirect("/");
        }
        else
        {
            res.render("login",{c:1});
        }
    });
})
app.post("/log",function(req,res)
{
    var name2=req.body.name1;
    var email=req.body.email;
    var phone=req.body.phone;
    var pass=req.body.pass;
    list.find({name:name2}).then(function(docs)
    {
        var len=docs.length;
        for(var i=0;i<len;i++)
        {
            console.log(docs[i].name);
        }
    })
    if(email.includes("@gmail.com")==false)
    {
        c=1;
        console.log(c+" Hello");
        res.render("signup",{c:1});
    }
    else
    {
        const data=
        {
            "name": name2,
            "email": email,
            "phone": phone,
            "password":pass
        }
        list.create(data);
        d++;
        const mail={
            from:"jayasanthoshamalakanti@gmail.com",
            to: email,
            subject:"WeBook",
            html:"<h1>You are now a official WeBook Member </h1>"+"<h1> We are pleased to welcome you to our Family </h1>"+name2
        };
        res.redirect("/");
        res.render("signup",{c:1});
        transport.sendMail(mail,function(error,info)
        {
            if(error)
            {
                console.log(error);
            }
            else{
                console.log("Email sent: "+info.response);
            }
        })
    }
})
app.get("/",function(req,res)
{
    if(d==0)
    {
        res.render('book',{c:0});
    }
    else
    {
        res.render('book',{c:1});
    }
})
app.get("/contact",function(req,res)
{
    if(d==0)
    {
        res.render('contact',{c:0});
    }
    else
    {
        res.render('contact',{c:1});
    }
})
app.post("/contact",function(req,res)
{
    if(d==0)
    {
        res.render('contact',{c:0});
    }
    else
    {
        res.render('contact',{c:1});
    }
})
app.post("/about",function(req,res)
{
    if(d==0)
    {
        res.render('about',{c:0});
    }
    else
    {
        res.render('about',{c:1});
    }
})
app.listen("3000",function()
{
    console.log("server listening on 3000");
})