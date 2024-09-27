const express = require('express');
const { mongoose } = require("mongoose");
const app = express()
const cors = require("cors")//cors is used to you work in backend and frontend meaning is cross platform
const bookRouter = require('./routing/BookRouting')

const PORT = 2000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost:27017/mvc-structure')
    .then(() => {
        console.log('database connected 👍')
    })
    .catch((err) => {
        console.log(err)
    })

app.use('/api/book', bookRouter)


app.get('/', (req, res) => {
    res.send("sever ")
})

app.listen(PORT, () => {
    console.log(`listen port number = ${PORT}`)
})