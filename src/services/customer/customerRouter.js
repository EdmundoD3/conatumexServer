import express from "express";
import cobranzaRouter from "./cobrador/cobranzaRoute.js";
import customerRoutes from "./admin/customerRoutes.js";

const customerRouter = express();

customerRouter.use("/admin",customerRoutes)

customerRouter.use("/cobrador",cobranzaRouter)


export default customerRouter