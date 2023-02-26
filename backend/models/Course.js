import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title:{
        type:String,
        required: [true, "Please Enter Course title"],
        maxLength: [80, "Title cannot exceed 80 characters"],
        minLength: [4, "Title should have more than 4 characters"],
    },
    description:{
        type:String,
        required: [true, "Please Enter Course title"],
        minLength: [20, "Title should have more than 20 characters"],
    },
    lectures:[
        {   
            title:{
                title:String,
                // required: true,
            },
            description:{
                type:String,
                required: true,
           
            },
            video:{
                public_id:{
                    type:String,
                    required: true,
                },
                url:{
                    type:String,
                    required: true,
                }
            },
        }
    ],
    poster:{
        public_id:{
            type:String,
            required: true,
        },
        url:{
            type:String,
            required: true,
        }
    },
    views:{
        type:Number,
        default:0,
    },
    numOfVideos:{
        type:Number,
        default:0,
    },
    category:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: String,
        required:[true,"Enter Course Creater Name"]
    },

});


export const Course = mongoose.model("Course",schema);
