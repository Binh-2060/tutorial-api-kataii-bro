import { query } from '../../db'

export async function getAllBillService() {
  const sql = `SELECT * FROM bill WHERE paid <> 1`
  let bills = await query(sql)

  const vehiclesSql = `SELECT * FROM vehicle`
  const vehicles = await query(vehiclesSql)
  bills = bills.map((item) => {
    const vehicle = [...vehicles].find((v) => v.id == item.vehicleId)
    const { vehicleId, ...data } = item
    return {
      ...data,
      vehicle,
    }
  })

  const vehicleTypesSql = `SELECT * FROM vehicleType`
  const vehicleTypes = await query(vehicleTypesSql)
  bills = bills.map((item) => {
    const vehicleType = [...vehicleTypes].find((c) => c.id == item.vehicle.id)
    const { vehicleTypeId, ...data } = item
    return {
      ...data,
      vehicleType,
    }
  })

  const usersSql = `SELECT * FROM user`
  const users = await query(usersSql)
  bills = bills.map((item) => {
    const user = [...users].find((u) => u.id == item.userId)
    const { userId, ...data } = item
    return {
      ...data,
      user,
    }
  })

  const servicesSql = `SELECT * FROM service`
  const services = await query(servicesSql)

  const billServiceSql = `SELECT * FROM billService`
  const billServices = await query(billServiceSql)
  bills = bills.map((item) => {
    let result = []
    result = [...billServices].filter(s => s.billId == item.id)

    result = result.map(r => {
      const service = services.find(s => r.serviceId == s.id)
      return {
        ...r,
        service
      }
    })

    return {
      ...item,
      services: result,
    }
  })

  return bills
}

export async function getAllServiceByVehicleTypeService(
  vehicleTypeId: string | number
) {
  const sql = `SELECT * FROM bill WHERE vehicleTypeId = ?`
  const bills = await query(sql, [vehicleTypeId])

  const vehicleTypesSql = `SELECT * FROM vehicleType`
  const vehicleTypes = await query(vehicleTypesSql)

  // console.log(vehicleTypes)

  const results = bills.map((item) => {
    const vehicleType = [...vehicleTypes].find(
      (c) => c.id == item.vehicleTypeId
    )
    // console.log('matched cat:', category)
    const { vehicleTypeId, ...data } = item
    return {
      ...data,
      vehicleType,
    }
  })

  // console.log(results)

  return results
}

export async function addBillService(vehicleId: string, userId: string) {
  const sql = `INSERT INTO bill(totalPrice, paid, createTime, payTime, userId, vehicleId) VALUES(0, 0, NOW(), NULL, ?, ?)`
  const result = await query(sql, [userId, vehicleId])
  return result
}

export async function payBillService(id: string) {
  const sql = `UPDATE bill SET paid = 1 WHERE id = ?`
  const result = await query(sql, [id])
  return result
}

export async function addBillServiceService(billId, services) {
  const sqlPromises = services.map((id) => {
    const sql = `INSERT INTO billService(amount, billId, serviceId) VALUES(?, ?, ?)`
    return query(sql, [1, billId, id])
  })

  const result = await Promise.all(sqlPromises)

  return result
}

export async function editBillService(
  id: string | number,
  name: string,
  price: string | number,
  vehicleTypeId: string | number
) {
  const sql = `UPDATE bill SET name = ?, price = ?, vehicleTypeId = ? WHERE id = ?`
  const result = await query(sql, [name, price, vehicleTypeId, id])
  return result
}

export async function deleteBillService(id: string | number) {
  const sql = `DELETE FROM bill WHERE id = ?`
  const result = await query(sql, [id])
  return result
}
