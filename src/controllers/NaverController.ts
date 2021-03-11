import NaverRepository from '../repositories/NaverRepository'
import { getCustomRepository } from 'typeorm'
import {  Request, Response } from 'express'
import * as yup from 'yup'


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
    
    const userRequest_id = request.user.id

    const naverRespository = getCustomRepository(NaverRepository)
    
    const naver = naverRespository.create({
      name,
      user_id: userRequest_id,
      birthdate: toDateBirthdate,
      admission_date: toDateAdmission_date,
      job_role
    })

    await naverRespository.save(naver)

    return response.status(200).json(naver)

  }

  async index(request: Request, response: Response) {
    const userRequest_id = request.user.id
    
    const naverRespository = getCustomRepository(NaverRepository)

    const navers = await naverRespository
    .find({where: request.query })
    
    const filteredNavers = navers.filter(function (naver) {
      const naverFilter = naver.user_id === userRequest_id
      return naverFilter
    })

    return response.status(200).json(filteredNavers)
  }

  async show(request: Request, response: Response) {
    const {id} = request.params

    const naverRepository = getCustomRepository(NaverRepository)

    const naver = await naverRepository.find({where: {id}})
    
    if (!naver) {
      return response.status(400).json({error: 'naver not found'})
    }

    return response.status(200).json(naver)
  }

  async update(request: Request, response: Response) {
    const { id, name, birthdate, admission_date, job_role} = request.body

    const toDateBirthdate = new Date(`${birthdate}`)
    const toDateAdmission_date = new Date(`${admission_date}`)
    
    const naverRepository = getCustomRepository(NaverRepository)

    const userRequest_id = request.user.id
    const naverOwnedByUser = await naverRepository.findOne({id})

    if (naverOwnedByUser?.user_id != userRequest_id) {
      return response.status(401).json({error: 'user not authorized'})
    }

    await naverRepository
    .update(id, 
      {name: name, 
      birthdate: toDateBirthdate,
      admission_date: toDateAdmission_date,
      job_role: job_role
      })

    const updatedNaver = await naverRepository.findOne({id})

    return response.status(200).json(updatedNaver)
  }

  async delete(request: Request, response: Response) {
    const {id} = request.body

    const naverRepository = getCustomRepository(NaverRepository)

    const userRequest_id = request.user.id

    const naverOwnedByUser = await naverRepository.findOne({id})

    if (!naverOwnedByUser) {
      return response.status(400).json({error: 'naver not found'})
    }

    if (naverOwnedByUser?.user_id != userRequest_id) {
      return response.status(401).json({error: 'user not authorized'})
    }

    await naverRepository.delete({id})

    return response.status(200).json({message: 'Naver deleted'})
  }
}

export default NaverController