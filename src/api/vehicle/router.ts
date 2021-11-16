import { Router } from 'express'
import { addVehicleController, addVehicleTypeController, deleteVehicleController, deleteVehicleTypeController, editVehicleController, editVehicleTypeController, getAllVehicleController, getAllVehicleTypesController, getVehicleByIdController } from './controller'

const router = Router()

router.get('/types', getAllVehicleTypesController)
router.post('/types', addVehicleTypeController)
router.put('/types/:id', editVehicleTypeController)
router.delete('/types/:id', deleteVehicleTypeController)

router.get('/', getAllVehicleController)
router.get('/:id', getVehicleByIdController)
router.post('/', addVehicleController)
router.put('/:id', editVehicleController)
router.delete('/:id', deleteVehicleController)

export default router
