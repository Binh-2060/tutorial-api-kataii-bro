import { Router } from 'express'
import { addProductCategoryController, addProductController, deleteProductCategoryController, deleteProductController, editProductCategoryController, editProductController, getAllProductCategoriesController, getAllProductController } from './controller'

const productRouter = Router()

productRouter.get('/categories', getAllProductCategoriesController)
productRouter.post('/categories', addProductCategoryController)
productRouter.put('/categories/:id', editProductCategoryController)
productRouter.delete('/categories/:id', deleteProductCategoryController)

productRouter.get('/', getAllProductController)
productRouter.post('/', addProductController)
productRouter.put('/:id', editProductController)
productRouter.delete('/:id', deleteProductController)

export default productRouter
