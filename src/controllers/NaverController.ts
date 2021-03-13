import NaverRepository from '../repositories/NaverRepository'
import { getCustomRepository } from 'typeorm'
import {  Request, Response } from 'express'
import * as yup from 'yup'
import NaversProjectsRepository from '../repositories/NaversProjectsRepository'


class NaverController {
  async store(request: Request, response: Response) {
    const {  name, birthdate, admission_date, job_role, projects } = request.body

    
    const schema = yup.object().shape({
      name: yup.string().required(),
      birthdate: yup.string().required(),
      admission_date: yup.string().required(),
      job_role: yup.string().required(),
      projects: yup.array().required()
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

    const naversProjectsRepository = getCustomRepository(NaversProjectsRepository)

    const naver_id = naver.id

    const naverProjectsMap = projects.map((project_id: string) => {
      return {
        naver_id,
        project_id
      }
    })

    const navers_Projects = naversProjectsRepository.create(naverProjectsMap)
    await naversProjectsRepository.save(navers_Projects)

    return response.status(200).json({naver, projects})

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

    const naversProjectsRepository = getCustomRepository(NaversProjectsRepository)

    const naver = await naversProjectsRepository
    .findOne({where: {naver_id: id},
    relations: ['naver', 'project'],
    })
    
    if (!naver) {
      return response.status(400).json({error: 'naver not found'})
    }

    return response.status(200).json(naver)
  }

  async update(request: Request, response: Response) {
    const { name, birthdate, admission_date, job_role, projects} = request.body
    const {id} = request.params

    const naverRepository = getCustomRepository(NaverRepository)

    const userRequest_id = request.user.id
    const naverOwnedByUser = await naverRepository.findOne({id})
    
    if (!naverOwnedByUser) {
      return response.status(400).json({error: 'naver not found'})
    }

    if (naverOwnedByUser?.user_id != userRequest_id) {
      return response.status(401).json({error: 'user not authorized'})
    }

    const toDateBirthdate = new Date(`${birthdate}`)
    const toDateAdmission_date = new Date(`${admission_date}`)
    


    await naverRepository
    .update(id, 
      {name, 
      birthdate: toDateBirthdate,
      admission_date: toDateAdmission_date,
      job_role
      })

    
    const updatedNaver = await naverRepository.findOne({id})

    const naverProjectsMap = projects.map((project_id: string) => {
      return {
        naver_id: id,
        project_id
      }
    })
    

    const naversProjectsRepository = getCustomRepository(NaversProjectsRepository)
    
    await naversProjectsRepository.createQueryBuilder()
    .delete()
    .where('naver_id = :naver_id', {naver_id: id})
    .execute()

    
    const newNaverProject = naversProjectsRepository.create(naverProjectsMap)
    await naversProjectsRepository.save(newNaverProject)
     
    
      
    return response.status(200).json({updatedNaver, projects})
  
  }

  async delete(request: Request, response: Response) {
    const {id} = request.params
    
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