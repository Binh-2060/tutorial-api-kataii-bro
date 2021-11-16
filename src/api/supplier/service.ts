import { query } from '../../db'

export async function getAllSupplierService() {
  const sql = `SELECT * FROM supplier`
  const suppliers = await query(sql)

  return suppliers
}

export async function addSupplierService(
  name: string,
  tel: string | number,
  address: string | number
) {
  const sql = `INSERT INTO supplier(name, tel, address) VALUES(?, ?, ?)`
  const result = await query(sql, [name, tel, address])
  return result
}

export async function editSupplierService(
  id: string | number,
  name: string,
  tel: string | number,
  address: string | number
) {
  const sql = `UPDATE supplier SET name = ?, tel = ?, address = ? WHERE id = ?`
  const result = await query(sql, [name, tel, address, id])
  return result
}

export async function deleteSupplierService(id: string | number) {
  const sql = `DELETE FROM supplier WHERE id = ?`
  const result = await query(sql, [id])
  return result
}
