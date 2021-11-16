import { Router } from 'express'
import { verify } from '../../util/jwt'
import { getAllBillController, addBillController, editBillController, deleteBillController, payBillController } from './controller'

const router = Router()

router.get('/', getAllBillController)
router.post('/', verify, addBillController)
router.post('/:id/pay', verify, payBillController)
router.put('/:id', verify, editBillController)
router.delete('/:id', verify, deleteBillController)

export default router
