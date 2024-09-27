const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
    moviename:{
        type:String,
        require:true,
    },
    moviedate:{
        type:Date,
        require:true,
    },
    movieposter:{
        type:String,
        require:true,
    },
    moviediscription:{
        type:String,
        require:true
    }
})

const User =model ('movie',movieSchema)
module.exports=User