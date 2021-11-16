import { Router } from 'express'
import { getAllSupplierController, addSupplierController, editSupplierController, deleteSupplierController } from './controller'

const router = Router()

router.get('/', getAllSupplierController)
router.post('/', addSupplierController)
router.put('/:id', editSupplierController)
router.delete('/:id', deleteSupplierController)

export default router
