import express from "express";
import cobranzaRouter from "./cobrador/cobranzaRoute.js";
import customerRoutes from "./customerRoutes.js";

const customerRouter = express();

customerRouter.use("/",customerRoutes)
customerRouter.use("/cobrador",cobranzaRouter)


export default customerRouter