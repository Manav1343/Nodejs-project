const express = require('express');
const sendMailer = require('../config/mailer');
const app = express.Router();

app.get('/',(req,res)=>{
    if(!req.cookies?.user){
        res.redirect('/signin')
    }
    res.render('index',{
        user:req.cookies.user
    })
})

app.get('/signin',(req,res)=>{
    res.render('signin')
})
app.get('/signup',(req,res)=>{
    res.render('signup')
})
app.get('/forget',(req,res)=>{
    res.render('sendotp')
})
app.get('/sendmail',(req,res)=>{
    res.render('forgetpass')
})
app.get('/logout',(req,res)=>{
    res.clearCookie('user')
    res.redirect('/signin')
})

// app.get('/sendmail',(req,res)=>{
//     sendMailer();
// })


module.exports = app