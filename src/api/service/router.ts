import { Router } from 'express'
import { getAllServiceController, addServiceController, editServiceController, deleteServiceController } from './controller'

const router = Router()

router.get('/', getAllServiceController)
router.post('/', addServiceController)
router.put('/:id', editServiceController)
router.delete('/:id', deleteServiceController)

export default router
