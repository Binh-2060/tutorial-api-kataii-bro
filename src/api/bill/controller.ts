import { request, Request, Response } from 'express'
import { Role } from '../../util/constant'
import { sign } from '../../util/jwt'
import {
  addBillService,
  deleteBillService,
  editBillService,
  getAllServiceByVehicleTypeService,
  getAllBillService,
  addBillServiceService,
  payBillService,
} from './service'

export async function getAllBillController(req: Request, res: Response) {
  
  const bills = await getAllBillService()

  return res.json(bills)
}

export async function addBillController(req: Request, res: Response) {
  const { id: userId } = req['payload']
  console.log(req['payload'])
  const { vehicleId, number, customerName, services } = req.body

  console.log('addBillController:', req.body)

  const result = await addBillService(vehicleId, userId)
  const billId = result['insertId']

  // add services
  const addServiceResult = addBillServiceService(billId, services)

  return res.json({ id: result['insertId'], vehicleId, result, addServiceResult })
}

export async function payBillController(req: Request, res: Response) {
  const {id} = req.params

  const result = await payBillService(id);  

  return res.json({
    message: `Bill ID: ${id} is paid`
  })
}

export async function editBillController(req: Request, res: Response) {
  const { id } = req.params
  const { name, price, vehicleTypeId } = req.body
  const result = await editBillService(id, name, price, vehicleTypeId)
  return res.json({ id, name, price })
}

export async function deleteBillController(req: Request, res: Response) {
  const { id } = req.params
  const result = await deleteBillService(id)
  return res.json({ id })
}
