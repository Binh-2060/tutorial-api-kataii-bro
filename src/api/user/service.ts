import { Response } from 'express'
import { decrypt, encrypt } from '../../util/crypt'
import { query } from '../../db'
import { sign } from '../../util/jwt'

export const loginUserService = async (username: string, password: string) => {
  const sql = `SELECT * FROM user WHERE username = ?`

  try {
    const result = await query(sql, [username])

    if (result.length > 0) {
      const user = result[0]

      if (decrypt(user['password']) == password) {
        const { password, ...body } = user

        return body
      }

      return null
    }
  } catch (e) {
    console.error(e)
  }

  return null
}

export const getUserMeService = async (res: Response, id: string | number) => {
  // TODO: SQL: explicitly select columns
  const sql = `SELECT * FROM user WHERE id = ?`

  try {
    const result = await query(sql, [id])

    if (result.length > 0) {
      // TODO: SQL: remove password from SQL select, so just pass it
      const { password, ...user } = result[0]
      return res.json({ user: user })
    }
  } catch (e) {
    console.error(e)
  }

  return res.status(400).end()
}

export const getAllUsersService = async () => {
  // TODO: SQL: explicitly select columns
  const sql = `SELECT * FROM user`

  try {
    const result = await query(sql)
    if (result.length > 0) {
      return result.map((user) => {
        // TODO: SQL: remove password from SQL select, so just pass it
        const { password, ...data } = user
        return data
      })
    }
    return []
  } catch (e) {
    console.error(e)
  }

  return null
}

export const getUserByIdService = async (id: string) => {
  // TODO: SQL: explicitly select columns
  const sql = `SELECT * FROM user WHERE id = ?`

  try {
    const result = await query(sql, [id])
    if (result.length > 0) {
      // TODO: SQL: remove password from SQL select, so just pass it
      const { password, ...data } = result[0]
      return data
    }
  } catch (e) {
    console.error(e)
  }

  return null
}

export const getUserByUsernameService = async (id: string) => {
  // TODO: SQL: explicitly select columns
  const sql = `SELECT * FROM user WHERE username = ?`

  try {
    const result = await query(sql, [id])
    if (result.length > 0) {
      // TODO: SQL: remove password from SQL select, so just pass it
      const { password, ...data } = result[0]
      return data
    }
  } catch (e) {
    console.error(e)
  }

  return null
}

export const addUserService = async (
  name,
  username,
  password,
  tel,
  address,
  role
) => {
  const sql =
    'INSERT user(name, username, password, tel, address, role) VALUES(?, ?, ?, ?, ?, ?)'

  const result = await query(sql, [
    name,
    username,
    encrypt(password),
    tel,
    address,
    role,
  ])

  return result
}

export const editUserService = async (id, name, tel, address, role) => {
  const sql =
    'UPDATE user SET name = ?, tel = ?, address = ?, role = ? WHERE id = ?'

  const result = await query(sql, [name, tel, address, role, id])

  return result
}

export const deleteUserService = async (id) => {
  const sql = 'DELETE FROM user WHERE id = ?'

  const result = await query(sql, [id])

  return result
}
