import { Router } from 'express'
import upload from '../../util/upload'
import { uploadImageController } from './upload.controller'

const uploadRouter = Router()

uploadRouter.post('/image', upload('images').single('file'), uploadImageController)

export default uploadRouter