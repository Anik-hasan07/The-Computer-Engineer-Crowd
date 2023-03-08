import express from 'express';
import {  changePassword, getMyProfile, login, logout, register, updateProfile } from '../controllers/userController.js';
import { isAuthenticatedUser } from '../middlewares/auth.js';
const router = express.Router();


router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/me").get(isAuthenticatedUser,getMyProfile)
router.route("/changepassword").put(isAuthenticatedUser,changePassword)
router.route("/updateprofile").put(isAuthenticatedUser,updateProfile)




export default router;