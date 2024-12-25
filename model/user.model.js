const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        min:[3,"Provide minimum 3 character"]
    },
    familyName:{
        type:String,
        min:[3,"Provide minimum 3 character"]
    },
    fullName:{
        type:String,
    },
    googleId:{
        type:String
    },
    email:{
        type:String,
        validator:[validator.isEmail,"Provide valid email"]
    },
    mobile:{
        type:String,
        length:[10,"Provide valid 10 numbers mobile number"]
    },
    password:{
        type:String,
        length:[7,"Provide minimum 7 letters password"]
    },
    resume:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"resume"
    },
    cv:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"cv"
    },
    coverLetter:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"coverLetter"
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    isSubscribed:{
        type:Boolean,
        default:true,
    },
    isPremiumTaken :{
        type:Boolean,
        default:false
    }
})
userSchema.pre('save',(next)=>{
    if(!password.isModified){next()};
    this.password = bcrypt.hash(this.password,5);
})

userSchema.methods.comparePassword = (enteredPassword)=>{
    return bcrypt.compare(enteredPassword,this.password);
}

const USER_MODEL = mongoose.model("User",userSchema);

module.exports = USER_MODEL;