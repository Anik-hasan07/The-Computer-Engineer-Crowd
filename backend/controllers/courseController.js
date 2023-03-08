import { catchAsyncError } from "../middlewares/catchAsyncErrors.js"
import { Course } from "../models/Course.js"
import ErrorHandler from "../utils/errorhander.js"

//GET ALL COURSES
export const getAllCourses = catchAsyncError(async(req,res,next)=>{
    const courses = await Course.find().select("-lectures");
    res.status(200).json({
        succcess:true,
        courses
    })
})


//CREATE NEW COURSE
export const createCourse = catchAsyncError(async(req,res,next)=>{

    const {title,description,category,createdBy} = req.body;
    // const file = req.file;
    if(!title || !description || !category || !createdBy) return next(new ErrorHandler("Please add all fields",400))

    await Course.create({
        title,
        description,
        category,
        createdBy,
        poster:{
            public_id:"temp",
            url:"temp"
        }
    })
    res.status(201).json({
        succcess:true,
        message:"Course created successfully.You can add lecture."
    })
})