const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express();
const port = 5000;
const userRoute = require('./route/userRoute')
const webRoute = require('./route/pageRoute')
const flash = require('express-flash');
const session = require('express-session')
const cookie = require('cookie-parser')
app.use(cookie())
require('dotenv').config();
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('view'))
app.use(session(
    {
        secret:'myesckey',
        resave:false,
        saveUninitialized:true
    }
))
app.use(flash())

mongoose.connect('mongodb+srv://mnv13it:8mjl5Y7BQgCZMOJa@cluster0.dkujqxz.mongodb.net/jwt-ejs')
.then(()=>{
    console.log("database connected👍");
}).catch((err)=>{
    console.log("error");
})



app.use('/api/user',userRoute)
app.use('/',webRoute)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))