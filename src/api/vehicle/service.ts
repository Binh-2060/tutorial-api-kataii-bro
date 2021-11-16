import { query } from '../../db'

export async function getAllVehicleService() {
  const sql = `SELECT * FROM vehicle`
  const vehicles = await query(sql)

  const vehicleTypesSql = `SELECT * FROM vehicleType`
  const vehicleTypes = await query(vehicleTypesSql)

  // console.log(vehicleTypes)

  const results = vehicles.map((item) => {
    const vehicleType = [...vehicleTypes].find((c) => c.id == item.vehicleTypeId)
    // console.log('matched cat:', vehicleType)
    const { vehicleTypeId, ...data } = item
    return {
      ...data,
      vehicleType,
    }
  })

  return results
}

export async function getVehicleByIdService(id: string | number) {
  const sql = `SELECT * FROM vehicle WHERE id = ? OR number = ? LIMIT 1`
  const vehicles = await query(sql, [id, id])

  if (vehicles && vehicles.length > 0) {
    const vehicleTypesSql = `SELECT * FROM vehicleType`
    const vehicleTypes = await query(vehicleTypesSql)

    // console.log(vehicleTypes)

    const results = vehicles.map((item) => {
      const vehicleType = [...vehicleTypes].find((c) => c.id == item.vehicleTypeId)
      // console.log('matched cat:', vehicleType)
      const { vehicleTypeId, ...data } = item
      return {
        ...data,
        vehicleType,
      }
    })

    return results[0]
  } else {
    return null
  }
}

export async function addVehicleService(
  number: string,
  customName: string,
  customerTel: string | number,
  vehicleTypeId: string | number
) {
  const sql = `INSERT INTO vehicle(number, customerName, customerTel, vehicleTypeId) VALUES(?, ?, ?, ?)`
  const result = await query(sql, [
    number,
    customName,
    customerTel,
    vehicleTypeId,
  ])
  return result
}

export async function getAllVehicleByVehicleTypeService(
  vehicleTypeId: string | number
) {
  const sql = `SELECT * FROM vehicle WHERE vehicleTypeId = ?`
  const vehicles = await query(sql, [vehicleTypeId])

  const vehicleTypesSql = `SELECT * FROM vehicleType`
  const vehicleTypes = await query(vehicleTypesSql)

  // console.log(vehicleTypes)

  const results = vehicles.map((item) => {
    const vehicleType = [...vehicleTypes].find(
      (c) => c.id == item.vehicleTypeId
    )
    // console.log('matched cat:', vehicleType)
    const { vehicleTypeId, ...data } = item
    return {
      ...data,
      vehicleType,
    }
  })

  // console.log(results)

  return results
}

export async function editVehicleService(
  id: string | number,
  number: string,
  customName: string,
  customerTel: string | number,
  vehicleTypeId: string | number
) {
  const sql = `UPDATE vehicle SET number = ?, customerName = ?, customerTel = ?, vehicleTypeId = ? WHERE id = ?`
  const result = await query(sql, [
    number,
    customName,
    customerTel,
    vehicleTypeId,
    id,
  ])
  return result
}

export async function deleteVehicleService(id: string | number) {
  const sql = `DELETE FROM vehicle WHERE id = ?`
  const result = await query(sql, [id])
  return result
}

export async function getAllVehicleTypesService() {
  const sql = `SELECT * FROM vehicleType`
  const result = await query(sql)

  return result
}

export async function addVehicleTypeService(name: string) {
  const sql = `INSERT INTO vehicleType(name) VALUES(?)`
  const result = await query(sql, [name])
  console.log(result)
  return result
}

export async function editVehicleTypeService(
  id: string | number,
  name: string
) {
  const sql = `UPDATE vehicleType SET name = ? WHERE id = ?`
  const result = await query(sql, [name, id])
  console.log(result)
  return result
}

export async function deleteVehicleTypeService(id: string | number) {
  const sql = `DELETE FROM vehicleType WHERE id = ?`
  const result = await query(sql, [id])
  console.log(result)
  return result
}
