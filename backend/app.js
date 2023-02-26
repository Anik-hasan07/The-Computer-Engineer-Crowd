import express from "express";
import { config } from "dotenv";

config({
    path:"./config/config.env"
})

const app = express();
import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";


//IMPORTING ROUTES
app.use("/api/v1",course)
app.use("/api/v1",user)

export default app;