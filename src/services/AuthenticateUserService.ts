import {  getCustomRepository } from 'typeorm'
import UserRepository from "../repositories/UserRepository";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

class AuthenticateUserService {
  public async execute(email: string, password: string) {

    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOne({where: {email}})

    if (!user) {
      throw new Error('Incorrect email or password')
    }

    const authorizedPassword = await compare(password, user.password)

    if (!authorizedPassword) {
      throw new Error('Incorrect email or password')
    }

    const webtoken = sign({}, `${process.env.HASH_JWT}`, {
      subject: user.id,
      expiresIn: '1d'
    })
    
    return {user, webtoken}
  }
}

export default AuthenticateUserService