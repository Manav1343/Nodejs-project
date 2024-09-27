const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username:{
        type:String,
        require:true,
    },
    user_email:{
        type:String,
        require:true,
        unique:true
    },
    user_pass:{
        type:String,
        require:true,
    },
    user_phone:{
        type:String,
        require:true
    },
    user_profile:{
        type:String,
        require:false
    },
    user_roleId:{
        type:Number,
        default:0,
        Enum:[1,2,3]
    }
},{
    timestamps:true
})

const User = model('user',userSchema);
module.exports = User