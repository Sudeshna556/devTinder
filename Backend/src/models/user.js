const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: { type: String ,required: true },
    email: { type: String, required: true, unique: true, lowercase : true }, // Ensure email is unique
    password: { type: String, required: true },
    address:{type : String},
    phone:{type:Number},
    
    gender : {type : String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Invalid entry");
        }
    }

    },
    age : {type : Number, min : 18},
    photoUrl : {
        type : String,
        default:"https://i.pinimg.com/474x/45/23/ea/4523ea5e69c921fe175a24b9ab12822e.jpg",
        // Validate URL format 
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid URL"+ value);
            }
        }
    },
    desc:{type:String, default:"Hi! I am a new user"},
    skills: { type: [String], default: [] }, // Array of skills
    
}, { timestamps: true });



// const userModel = mongoose.model('user', userSchema);

module.exports = mongoose.model('User', userSchema);;

