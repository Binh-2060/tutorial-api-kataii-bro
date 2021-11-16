import { editSupplierService } from 'api/supplier/service'
import { Request, Response } from 'express'
import { Role } from '../../util/constant'
import { sign } from '../../util/jwt'
import {
  getUserByIdService,
  getUserByUsernameService,
  getUserMeService,
  getAllUsersService,
  loginUserService,
  editUserService,
  addUserService,
  deleteUserService,
} from './service'

export const loginUserController = async (req: Request, res: Response) => {
  const { username, password } = req.body

  try {
    const user = await loginUserService(username, password)

    if (user != null) {
      return res.json({
        user: user,
        token: sign({ ...user, role: Role.staff }),
      })
    }
  } catch (e) {
    console.error(e)
  }

  return res.status(400).json({
    message: 'Unable to login, please check your credential is invalid',
  })
}

export const getUserMeController = async (req: Request, res: Response) => {
  const { id } = req['payload']

  return getUserMeService(res, id)
}

export const logoutUserController = async (req: Request, res: Response) => {
  return res.status(200).end()
}

export const getAllUsersController = async (req: Request, res: Response) => {
  const users = await getAllUsersService()
  if (users != null) {
    return res.json(users)
  }

  return res.status(500).json({ message: 'Unable to get users' })
}

export const getUserByIdController = async (req: Request, res: Response) => {
  const { id } = req.params

  if (id && id.length > 0) {
    if (id.charAt(0) == '@') {
      const user = await getUserByUsernameService(id.substring(1))
      if (user != null) {
        return res.json(user)
      }
      return res.status(400).json({
        message: 'User ID does not exist',
      })
    } else {
      const user = await getUserByIdService(id)
      if (user != null) {
        return res.json(user)
      }
      return res.status(400).json({
        message: 'User ID does not exist',
      })
    }
  }

  return res.status(400).json({
    message: 'User ID is incorrect',
  })
}

export const addUserController = async (req: Request, res: Response) => {
  const { name, username, password,  tel, address, role } = req.body

  const user = await addUserService(name, username, password, tel, address, role);

  return res.json({
    message: 'updated'
  })
}

export const editUserController = async (req: Request, res: Response) => {
  const { id } = req.params
  const { name, tel, address, role } = req.body

  const user = await editUserService(id, name, tel, address, role);

  return res.json({
    message: 'updated'
  })
}

export const deleteUserController = async (req, res) => {
  const { id } = req.params
  await deleteUserService(id);

  return res.json({
    message: 'deleted'
  })
}
