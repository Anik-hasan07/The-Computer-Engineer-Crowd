import { catchAsyncError } from "../middlewares/catchAsyncErrors.js"
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorhander.js";
import { sendToken } from "../utils/sendToken.js";

//REGISTER A USER
export const register = catchAsyncError(async (req, res, next) => {
    const {name,email,password} = req.body;
    // const filr = req.file;

    if(!name || !email || !password)
    return next(new ErrorHandler("Please enter all field",400))

    let user = await User.findOne({email})
    if(user) return next(new ErrorHandler("User Already Exists",409));

    //UPLOD CLOUDINARY

    user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"tempqid",
            url:"tempurl"
        }
    })
    sendToken(res,user,`Register successfully ${user.name}`,200)

    // res.status(200).json({
    //     success:true,
    //     user
    // })
    
})

//LOGIN A USER
export const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
      }

      const user = await User.findOne({ email }).select("+password");
      
      if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }

      const isPasswordMatched = await user.comparePassword(password);
      if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }

      sendToken(res,user,`Login successfully, ${user.name}`,200)

})

// Logout User
export const logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

    res.status(200).json({
    success: true,
    message: "Logged Out",
    });  

})

// GET PROFILE
export const getMyProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
    success: true,
    user
    });  

})

// change/update password
export const changePassword = catchAsyncError(async (req, res, next) => {
    const{oldPassword,newPassword} = req.body;
    const user = await User.findById(req.user.id).select("+password")

    const isPasswordMatched = await user.comparePassword(oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
        }
    if (newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
    }
    user.password = newPassword;
    await user.save();

    res.status(200).json({
    success: true,
    message:"Password changed successfully"

    });  
})   

//UPDATE PROFILE
export const updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
      };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
    });  

    res.status(200).json({
        success: true,
        message:"Profile updated successfully"
    });

})

