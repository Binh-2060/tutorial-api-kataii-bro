import { Router } from 'express'
import productRouter from './product/router'
import serviceRouter from './service/router'
import userRouter from './user/router'
import vehicleRouter from './vehicle/router'
import supplierRouter from './supplier/router'
import billRouter from './bill/router'

const router = Router()

router.use('/users', userRouter)
router.use('/vehicles', vehicleRouter)
router.use('/products', productRouter)
router.use('/services', serviceRouter)
router.use('/suppliers', supplierRouter)
router.use('/bills', billRouter)

export default router
