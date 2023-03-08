import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import ErrorMiddleware from "./middlewares/error.js";

config({
    path:"./config/config.env"
})

const app = express();

//USING MIDDLEWARE
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(cookieParser());



import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";



//IMPORTING ROUTES
app.use("/api/v1",course)
app.use("/api/v1",user)

// Middleware for Errors
app.use(ErrorMiddleware);

export default app;