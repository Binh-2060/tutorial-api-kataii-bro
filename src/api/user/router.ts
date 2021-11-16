import { Router } from 'express'
import { editUserValidator } from './validators'
import { verify, verifyRole } from '../../util/jwt'
import { getUserByIdController, getUserMeController, getAllUsersController, loginUserController, logoutUserController, editUserController, addUserController, deleteUserController } from './controller'
import { Role } from '../../util/constant'

const userRouter = Router()

userRouter.post('/login', loginUserController)
userRouter.post('/me', verify, getUserMeController)
userRouter.post('/logout', verify, logoutUserController)

userRouter.get('/', verify, getAllUsersController)
userRouter.get('/:id', verify, getUserByIdController)
userRouter.post('/', verify, addUserController)
userRouter.put('/:id', verify, /* verifyRole(Role.manager), */ editUserController)
userRouter.delete('/:id', verify, /* verifyRole(Role.manager), */ deleteUserController)

export default userRouter
