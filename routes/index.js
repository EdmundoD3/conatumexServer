import { Router } from "express";
import authTokenRouter from "./authToken.js";
import custonerRouter from './customer.js'
import purchaseRouter from './purchase.js'
import register from './register.js'

const routes = Router()

routes.use('/auth', authTokenRouter)
routes.use('/customer', custonerRouter)
routes.use('/purchase', purchaseRouter)
routes.use('/sign_up', register)

export default routes