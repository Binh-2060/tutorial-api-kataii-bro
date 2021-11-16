import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { Role } from './constant'
import environment from '../environment'

export const PRIVATE_KEY = environment.privateKey
export const PUBLIC_KEY = environment.publicKey

const issuer = 'Lacta Co.,Ltd' // Issuer (Software organization who issues the token)
const subject = 'info@lactasoylao.com' // Subject (intended user of the token)
const audience = 'http://lactasoylao.com' // Audience (Domain within which this token will live and function)

export const options: jwt.SignOptions = {
  issuer: issuer, 
  subject: subject,
  audience: audience,
  expiresIn: process.env.TOKEN_EXPIRE_IN || '8h',
  algorithm: 'RS256',
}

export const sign = (payload: object) => {
  console.log('payload:', payload)
  return jwt.sign(payload, PRIVATE_KEY, options)
}

export const verify = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.headers['authorization'] &&
    req.headers['authorization'].includes('Bearer')
  ) {
    const token = req.headers['authorization'].split(' ')[1]

    jwt.verify(token, PUBLIC_KEY, options, (err, decoded) => {
      if (err)
        return res
          .status(401)
          .json({ message: 'Failed to authenticate with provided token' })
      req['payload'] = decoded
      next()
    })
  } else {
    return res.status(401).json({ message: 'No Bearer token in the headers' })
  }
}

export const verifyRole = (roles: Role | Role[]) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (roles && roles.includes(req['payload']['role'])) {
    next()
  } else {
    return res.status(403).json({ message: 'Permission denied' })
  }
}

const resetPasswordOptions: jwt.SignOptions = {
  issuer: issuer,
  subject: subject,
  audience: audience,
  expiresIn: '30m',
  algorithm: 'RS256',
}

export const signResetPassword = (payload: object) => {
  return jwt.sign(payload, PRIVATE_KEY, resetPasswordOptions)
}

export const verifyResetPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.headers['authorization'] &&
    req.headers['authorization'].includes('Bearer')
  ) {
    const token = req.headers['authorization'].split(' ')[1]

    jwt.verify(token, PUBLIC_KEY, options, (err, decoded) => {
      if (err)
        return res
          .status(401)
          .json({ message: 'Failed to authenticate with provided token' })
      req['payload'] = decoded
      next()
    })
  } else {
    return res.status(401).json({ message: 'No Bearer token in the headers' })
  }
}
