import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export const usernameRegEx = /^[a-z]{1}[a-z0-9_\-.]{4,16}$/i
export const emailRegEx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
export const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
export const fbRegEx = /^(((http|https):\/\/|)(www\.|)(fb\.com|fb\.com)\/[a-zA-Z0-9.]+)$/gi

export const validatorHandler = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

export function validateEmail(email: string, res: Response) {
  if (emailRegEx.test(email) == false) {
    res.status(400).json({
      message: `email is invalid.`,
    })
    return false
  }
  return true
}

export function validatePassword(password: string, res: Response) {
  if (passwordRegEx.test(password) == false) {
    res.status(400).json({
      message: `password is invalid.`,
    })
    return false
  }
  return true
}

export function validateUsername(username: string, res: Response) {
  if (usernameRegEx.test(username) == false) {
    res.status(400).json({
      message: `username is invalid. username must start with a character and contains only characters, numbers, '_', '-', '.'.`,
    })
    return false
  }
  return true
}

export function validateFacebook(fb, res: Response) {
  if (fb.length > 0 && !fbRegEx.test(fb)) {
    res.status(403).json({
      message: `Facebook URL is badly format`,
    })
    return false
  }
  return true
}
