const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express()
const port = 5000;
const moviRoute = require('./routes/movieRoute');
const User = require('./model/movieModel');

app.set('view engine','ejs');
app.use(express.static('views'));
app.use(express.json());
app.use(express.urlencoded())

app.use('/profile',express.static('uploads'))

mongoose.connect('mongodb://localhost:27017/movieapi')
.then(()=>{
    console.log("Database connected 👍");
}).catch(()=>{
    console.log("error");
})

app.get('/',(req,res)=>{
    res.render('pages/index',{title:"home page"})
})
app.get('/add',(req,res)=>{
    res.render('pages/form',{title:"form page"})
})
app.get('/show',async(req,res)=>{
    const movieapi = await User.find();
    res.render('pages/view',{title:"view page",movieapi})
})
app.use('/api/movie',moviRoute)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))