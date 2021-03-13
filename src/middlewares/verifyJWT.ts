import { verify } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import AppError from '../errors/AppError'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

export default async function verifyJWT(
  request: Request, 
  response: Response,
  next: NextFunction) {

  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, `${process.env.HASH_JWT}`)

    const { sub } = decoded as TokenPayload

    request.user = {
      id: sub
    }

    return next()

  } catch (error) {
    throw new AppError('Invalid JWT Token', 401)
  }


}
