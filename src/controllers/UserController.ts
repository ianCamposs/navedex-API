import { Request, Response } from "express";
import * as yup from 'yup'
import { getCustomRepository} from 'typeorm'
import UserRepository from '../repositories/UserRepository' 
import { hash } from 'bcryptjs'

class UserController {
  async store(request: Request, response: Response) {
    const { email, password } = request.body
    
    const schema = yup.object().shape({
      email: yup.string().required(),
      password: yup.string().required()
    })

    /*
    try {
      await schema.validate(request.body)
    } catch (error) {
      throw new AppError(error)
    }
    */

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({error: 'invalid requisition'})
    }

    const userRepository = getCustomRepository(UserRepository)
    
    const userAlreadyExists = await userRepository.findOne({email})
    
    if (userAlreadyExists) {
      return response.status(400).json({error: 'Email already registered, please use another one'})
    }

    const cryptoPassword = await hash(password, 8)

    const user = userRepository.create({
      email: email,
      password: cryptoPassword
    })

    await userRepository.save(user)

    return response.status(200).json(user)
  }
}

export default UserController