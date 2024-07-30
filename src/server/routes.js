import express from "express";
import userRouter from "../services/user/userRoutes.js";
import customerRouter from "../services/customer/customerRouter.js";

const router = express();

router.use("/user",userRouter)
router.use("/customer",customerRouter)

export default router