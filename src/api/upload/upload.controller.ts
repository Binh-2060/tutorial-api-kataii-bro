import { Request, Response } from 'express'

export const uploadImageController = (req: Request, res: Response) => {
  const baseUrl = req.headers.host + '/uploads/images'
  const fileName = req.file.filename
    // @ts-ignore
  return res.json({ 
    url: `http://${baseUrl}/${fileName}`
   })
}
