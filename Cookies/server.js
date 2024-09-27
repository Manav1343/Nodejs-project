const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config()
var cookieParser = require('cookie-parser')
const userRoute = require('./routes/userRoute')
const pageRoute = require('./routes/pageRoute');


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("database connected👍");
  })
  .catch(() => {
    console.log("database not connected");
  });


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(cookieParser())


app.use('/',pageRoute)
app.use('/api/user',userRoute)


app.listen(PORT,()=>console.log(`listen your port number${PORT}👍`))

