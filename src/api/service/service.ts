import { query } from '../../db'

export async function getAllServiceService() {
  const sql = `SELECT * FROM service`
  const services = await query(sql)

  const vehicleTypesSql = `SELECT * FROM vehicleType`
  const vehicleTypes = await query(vehicleTypesSql)

  const results = services.map((item) => {
    const vehicleType = [...vehicleTypes].find((c) => c.id == item.vehicleTypeId)
    const { vehicleTypeId, ...data } = item
    return {
      ...data,
      vehicleType,
    }
  })

  // console.log(results)

  return results
}

export async function getAllServiceByVehicleTypeService(
  vehicleTypeId: string | number
) {
  const sql = `SELECT * FROM service WHERE vehicleTypeId = ?`
  const services = await query(sql, [vehicleTypeId])

  const vehicleTypesSql = `SELECT * FROM vehicleType`
  const vehicleTypes = await query(vehicleTypesSql)

  // console.log(vehicleTypes)

  const results = services.map((item) => {
    const vehicleType = [...vehicleTypes].find((c) => c.id == item.vehicleTypeId)
    const { vehicleTypeId, ...data } = item
    return {
      ...data,
      vehicleType,
    }
  })

  // console.log(results)

  return results
}

export async function addServiceService(
  name: string,
  price: string | number,
  vehicleTypeId: string | number
) {
  const sql = `INSERT INTO service(name, price, vehicleTypeId) VALUES(?, ?, ?)`
  const result = await query(sql, [name, price, vehicleTypeId])
  return result
}

export async function editServiceService(
  id: string | number,
  name: string,
  price: string | number,
  vehicleTypeId: string | number
) {
  const sql = `UPDATE service SET name = ?, price = ?, vehicleTypeId = ? WHERE id = ?`
  const result = await query(sql, [name, price, vehicleTypeId, id])
  return result
}

export async function deleteServiceService(id: string | number) {
  const sql = `DELETE FROM service WHERE id = ?`
  const result = await query(sql, [id])
  return result
}
