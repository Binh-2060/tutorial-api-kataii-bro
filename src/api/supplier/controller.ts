import { Request, Response } from 'express'
import { Role } from '../../util/constant'
import { sign } from '../../util/jwt'
import {
  addSupplierService,
  deleteSupplierService,
  editSupplierService,
  getAllSupplierService,
} from './service'

export async function getAllSupplierController(req: Request, res: Response) {
  let suppliers = []

  suppliers = await getAllSupplierService()

  return res.json(suppliers)
}

export async function addSupplierController(req: Request, res: Response) {
  const { name, tel, address } = req.body
  const result = await addSupplierService(name, tel, address)
  return res.json({ id: result['insertId'], name, tel, address })
}

export async function editSupplierController(req: Request, res: Response) {
  const { id } = req.params
  const { name, tel, address } = req.body
  const result = await editSupplierService(id, name, tel, address)
  return res.json({ id, name, tel })
}

export async function deleteSupplierController(req: Request, res: Response) {
  const { id } = req.params
  const result = await deleteSupplierService(id)
  return res.json({ id })
}
