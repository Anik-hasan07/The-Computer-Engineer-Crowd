import mongoose from "mongoose";
const validator = require("validator");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [6, "Password should be greater than 6 characters"],
    select: false,
    },
    role: {
    type: String,
    enum:["admin","user"],
    default: "user",
    },
    subscription:{
    id:String,
    status:String,
    },
    avatar: {
    public_id: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    },
    playlist:[
    {
        course:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Course"
        },
        poster:String, 
    }
    ],
    createdAt: {
    type: Date,
    default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

});


export const User = mongoose.model("User",schema);
