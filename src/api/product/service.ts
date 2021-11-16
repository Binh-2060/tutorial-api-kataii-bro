import { query } from '../../db'

export async function getAllProductCategoriesService() {
  const sql = `SELECT * FROM productCat`
  const result = await query(sql)
  return result
}

export async function addProductCategoryService(name: string) {
  const sql = `INSERT INTO productCat(name) VALUES(?)`
  const result = await query(sql, [name])
  console.log(result)
  return result
}

export async function editProductCategoryService(
  id: string | number,
  name: string
) {
  const sql = `UPDATE productCat SET name = ? WHERE id = ?`
  const result = await query(sql, [name, id])
  console.log(result)
  return result
}

export async function deleteProductCategoryService(id: string | number) {
  const sql = `DELETE FROM productCat WHERE id = ?`
  const result = await query(sql, [id])
  console.log(result)
  return result
}

export async function getAllProductService() {
  const sql = `SELECT * FROM product`
  const result = await query(sql)

  const catSql = `SELECT * FROM productCat`
  const categories = await query(catSql)

  const products = result.map((item) => {
    const category = [...categories].find((c) => c.id == item.productCatId)
    const {productCatId, ...data} = item;
    return {
      ...data,
      category,
    }
  })

  return products
}

export async function addProductService(
  name: string,
  amount: string | number,
  price: string | number,
  productCatId: string | number
) {
  const sql = `INSERT INTO product(name, amount, price, productCatId) VALUES(?, ?, ?, ?)`
  const result = await query(sql, [name, amount, price, productCatId])
  return result
}

export async function editProductService(
  id: string | number,
  name: string,
  amount: string | number,
  price: string | number,
  productCatId: string | number
) {
  const sql = `UPDATE product SET name = ?, amount = ?, price = ?, productCatId = ? WHERE id = ?`
  const result = await query(sql, [name, amount, price, productCatId, id])
  return result
}

export async function deleteProductService(
  id: string | number,
) {
  const sql = `DELETE FROM product WHERE id = ?`
  const result = await query(sql, [id])
  return result
}