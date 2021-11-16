import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

export const editUserValidator = [
  body('id').notEmpty(),
  body('name').notEmpty(),
  body('username').notEmpty(),
  body('profile').notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]