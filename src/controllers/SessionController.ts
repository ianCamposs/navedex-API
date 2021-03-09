import { Request, Response } from "express";
import UserRepository from '../repositories/UserRepository'
import { getCustomRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

class SessionController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body

    const userRepository = getCustomRepository(UserRepository)

    const userExists = await userRepository.findOne({email})

    if (!userExists) {
      return response.status(400).json({error: 'User not found'})
    }

    const correctPassword = await compare(password, userExists.password)

    if (!correctPassword) {
      return response.status(400).json({error: 'User not found'})
    }

    const webtoken = sign({}, `${process.env.HASH_JWT}`, {
      subject: userExists.id,
      expiresIn: '1d'
    })

    return response.json({
      webtoken,
      userExists
    })
  }

}

export default SessionController