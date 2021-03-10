import NaverRepository from '../repositories/NaverRepository'
import { Brackets, getCustomRepository, IsNull } from 'typeorm'
import {  Request, Response } from 'express'
import * as yup from 'yup'

interface Query {
  name: string
  exp: number
  sub: string
}

class NaverController {
  async store(request: Request, response: Response) {
    const {  name, birthdate, admission_date, job_role } = request.body

    const schema = yup.object().shape({
      name: yup.string().required(),
      birthdate: yup.string().required(),
      admission_date: yup.string().required(),
      job_role: yup.string().required()
    })

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({error: 'invalid requisition'})
    }


    const toDateBirthdate = new Date(`${birthdate}`)
    const toDateAdmission_date = new Date(`${admission_date}`)
    
    const user_id = request.user.id

    const naverRespository = getCustomRepository(NaverRepository)
    
    const naver = naverRespository.create({
      name,
      user_id,
      birthdate: toDateBirthdate,
      admission_date: toDateAdmission_date,
      job_role
    })

    await naverRespository.save(naver)

    return response.status(200).json(naver)

  }

  async index(request: Request, response: Response) {
    const user_id = request.user.id
    
    const naverRespository = getCustomRepository(NaverRepository)

    const navers = await naverRespository
    .find({where: request.query })
    
    const filteredNavers = navers.filter(function (naver) {
      const naverFilter = naver.user_id === user_id
      return naverFilter
    })

    return response.status(200).json(filteredNavers)
  }

  async show(request: Request, response: Response){
    const {id} = request.params

    const naverRepository = getCustomRepository(NaverRepository)

    const naver = await naverRepository.find({where: {id}})
    

    return response.status(200).json(naver)
  }
}

export default NaverController