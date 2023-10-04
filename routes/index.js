import { Router } from "express";
// import authTokenRouter from "./authToken.js";
import custonerRouter from './customer.js'
// import purchaseRouter from './purchase.js'


const routes = Router()

// router.use('/auth', authTokenRouter)
routes.use('/customer', custonerRouter)
// router.use('/purchase', purchaseRouter)

export default routes