import { Router } from "express";
import authTokenRouter from "./authToken.js";
import custonerRouter from './customer.js'
import purchaseRouter from './purchase.js'
import paymentsRouter from './payments.js'
import register from './register.js'

const router = Router()

router.use('/auth', authTokenRouter)
router.use('/customer', custonerRouter)
router.use('/purchases', purchaseRouter)
router.use('/payments', paymentsRouter)
router.use('/sign_up', register)

export default router