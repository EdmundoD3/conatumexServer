import express from "express";
import authTokenRouter from "./auth/auth.js";
import registerRouter from "./register/register.js";

const userRouter = express();

userRouter.use("/auth",authTokenRouter)
userRouter.use("/",registerRouter)

export default userRouter