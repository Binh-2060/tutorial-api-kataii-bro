import { Request, Response } from 'express'
import { Role } from '../../util/constant'
import { sign } from '../../util/jwt'
import {
  addServiceService,
  deleteServiceService,
  editServiceService,
  getAllServiceByVehicleTypeService,
  getAllServiceService,
} from './service'

export async function getAllServiceController(req: Request, res: Response) {
  let services = []

  if (req.query['vehicleTypeId']) {
    const vehicleTypeId = req.query['vehicleTypeId']
    services = await getAllServiceByVehicleTypeService(`${vehicleTypeId}`)
  } else {
    services = await getAllServiceService()
  }

  return res.json(services)
}

export async function addServiceController(req: Request, res: Response) {
  const { name, price, vehicleTypeId } = req.body
  const result = await addServiceService(name, price, vehicleTypeId)
  return res.json({ id: result['insertId'], name, price, vehicleTypeId })
}

export async function editServiceController(req: Request, res: Response) {
  const { id } = req.params
  const { name, price, vehicleTypeId } = req.body
  const result = await editServiceService(id, name, price, vehicleTypeId)
  return res.json({ id, name, price })
}

export async function deleteServiceController(req: Request, res: Response) {
  const { id } = req.params
  const result = await deleteServiceService(id)
  return res.json({ id })
}
