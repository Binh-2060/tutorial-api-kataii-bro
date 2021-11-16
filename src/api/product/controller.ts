import { Request, Response } from 'express'
import { Role } from '../../util/constant'
import { sign } from '../../util/jwt'
import {
  addProductCategoryService,
  addProductService,
  deleteProductCategoryService,
  deleteProductService,
  editProductCategoryService,
  editProductService,
  getAllProductCategoriesService,
  getAllProductService,
} from './service'

export async function getAllProductCategoriesController(
  req: Request,
  res: Response
) {
  const types = await getAllProductCategoriesService()
  return res.json(types)
}

export async function addProductCategoryController(
  req: Request,
  res: Response
) {
  const { name } = req.body
  const result = await addProductCategoryService(name)
  return res.json({
    id: result['insertId'],
    name,
  })
}
export async function editProductCategoryController(
  req: Request,
  res: Response
) {
  const { id } = req.params
  const { name } = req.body
  const result = await editProductCategoryService(id, name)
  return res.json({
    id,
    name,
  })
}
export async function deleteProductCategoryController(
  req: Request,
  res: Response
) {
  const { id } = req.params
  const result = await deleteProductCategoryService(id)
  return res.json({
    id,
  })
}

export async function getAllProductController(req: Request, res: Response) {
  const products = await getAllProductService()
  return res.json(products)
}

export async function addProductController(req: Request, res: Response) {
  const { name, amount, price, productCatId } = req.body
  const result = await addProductService(name, amount, price, productCatId)
  return res.json({ id: result['insertId'], name, amount, price, productCatId })
}

export async function editProductController(req: Request, res: Response) {
  const { id } = req.params
  const { name, amount, price, productCatId } = req.body
  const result = await editProductService(id, name, amount, price, productCatId)
  return res.json({ id, name, amount, price, productCatId })
}

export async function deleteProductController(req: Request, res: Response) {
  const { id } = req.params
  const result = await deleteProductService(id)
  return res.json({ id })
}
