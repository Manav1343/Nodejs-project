const { Schema, model } = require("mongoose");

const userSchema = Schema({
    username:{
        type:String,
        require:true,
    },
    number:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    otp:{
        type:Number,
    }
})

const User = model('userSignup',userSchema)
module.exports = User