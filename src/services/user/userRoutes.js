import express from "express";
import authTokenRouter from "./auth/auth.js";
import registerRouter from "./register/register.js";
import adminUserRouter from "./admin/adminUser.js";

const userRouter = express();

userRouter.use("/admin",adminUserRouter)
userRouter.use("/auth",authTokenRouter)
userRouter.use("/",registerRouter)

export default userRouter