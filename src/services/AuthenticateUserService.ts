import {  getCustomRepository } from 'typeorm'
import UserRepository from "../repositories/UserRepository";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import AppError from '../errors/AppError'

class AuthenticateUserService {
  public async execute(email: string, password: string) {

    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOne({where: {email}})

    if (!user) {
      throw new AppError('Incorrect email or password', 401)
    }

    const authorizedPassword = await compare(password, user.password)

    if (!authorizedPassword) {
      throw new AppError('Incorrect email or password', 401)
    }

    const webtoken = sign({}, `${process.env.HASH_JWT}`, {
      subject: user.id,
      expiresIn: '1d'
    })
    
    return {webtoken}
  }
}

export default AuthenticateUserService