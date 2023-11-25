import { Router } from "express";
import authTokenRouter from "../services/loggin/authToken.js";
import custonerRouter from '../apiServices/customer/customer.js'
import purchaseRouter from '../apiServices/purchase/purchase.js'
import paymentsRouter from '../apiServices/payments/payments.js'
import register from '../apiServices/users/register.js'

const router = Router()

router.use('/auth', authTokenRouter)
router.use('/customer', custonerRouter)
router.use('/purchases', purchaseRouter)
router.use('/payments', paymentsRouter)
router.use('/sign_up', register)

export default router