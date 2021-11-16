
import { Request, Response } from 'express'
import { Role } from '../../util/constant'
import { sign } from '../../util/jwt'
import {
  addVehicleService,
  addVehicleTypeService,
  deleteVehicleService,
  deleteVehicleTypeService,
  editVehicleService,
  editVehicleTypeService,
  getAllVehicleByVehicleTypeService,
  getAllVehicleService,
  getAllVehicleTypesService,
  getVehicleByIdService,
} from './service'

export async function getAllVehicleController(req: Request, res: Response) {
  let vehicles = []

  if (req.query['vehicleTypeId']) {
    const vehicleTypeId = req.query['vehicleTypeId']
    vehicles = await getAllVehicleByVehicleTypeService(`${vehicleTypeId}`)
  } else {
    vehicles = await getAllVehicleService()
  }

  return res.json(vehicles)
}
export async function getVehicleByIdController(req: Request, res: Response) {
  const {id} = req.params
  const vehicle = await getVehicleByIdService(id)

  return res.json(vehicle)
}



export async function addVehicleController(req: Request, res: Response) {
  const { number, customerName, customerTel, vehicleTypeId } = req.body
  const result = await addVehicleService(
    number,
    customerName,
    customerTel,
    vehicleTypeId
  )
  return res.json({
    id: result['insertId'],
    number,
    customerName,
    customerTel,
    vehicleTypeId,
  })
}

export async function editVehicleController(req: Request, res: Response) {
  const { id } = req.params
  const { number, customerName, customerTel, vehicleTypeId } = req.body
  const result = await editVehicleService(
    id,
    number,
    customerName,
    customerTel,
    vehicleTypeId
  )
  return res.json({ id, number, customerName, customerTel, vehicleTypeId })
}

export async function deleteVehicleController(req: Request, res: Response) {
  const { id } = req.params
  const result = await deleteVehicleService(id)
  return res.json({ id })
}

export async function getAllVehicleTypesController(
  req: Request,
  res: Response
) {
  const types = await getAllVehicleTypesService()
  return res.json(types)
}

export async function addVehicleTypeController(req: Request, res: Response) {
  const { name } = req.body
  const result = await addVehicleTypeService(name)
  return res.json({
    id: result['insertId'],
    name,
  })
}
export async function editVehicleTypeController(req: Request, res: Response) {
  const { id } = req.params
  const { name } = req.body
  const result = await editVehicleTypeService(id, name)
  return res.json({
    id,
    name,
  })
}
export async function deleteVehicleTypeController(req: Request, res: Response) {
  const { id } = req.params
  const result = await deleteVehicleTypeService(id)
  return res.json({
    id,
  })
}

