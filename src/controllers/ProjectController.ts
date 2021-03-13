import { Request, Response } from "express";
import { getCustomRepository}  from 'typeorm'
import ProjectRepository from "../repositories/ProjectRepository";
import NaversProjectsRepository from '../repositories/NaversProjectsRepository'
import * as yup from 'yup'

class ProjectController {
  async store(request: Request, response: Response) {
    const { name, navers } = request.body

    const schema = yup.object().shape({
      name: yup.string().required(),
      navers: yup.array().required()
    })

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({error: 'invalid requisition'})
    }

    const userRequest_id = request.user.id

    const projectRepository = getCustomRepository(ProjectRepository)

    const project =  projectRepository.create({
      name,
      user_id: userRequest_id,
    })

    await projectRepository.save(project)

    const naversProjectsRepository = getCustomRepository(NaversProjectsRepository)

    const project_id = project.id
    
    const naverProjectsMap = navers.map((naver_id: string) => {
      return {
        naver_id,
        project_id
      }
    })

    const navers_Projects = naversProjectsRepository.create(naverProjectsMap)
    await naversProjectsRepository.save(navers_Projects)
    
    return response.status(200).json({name: project.name, navers})
  }

  async index(request: Request, response: Response) {
    const userRequest_id = request.user.id

    const projectRepository = getCustomRepository(ProjectRepository)

    const projects = await projectRepository.find({where: request.query})

    const filteredProjects = projects.filter(function (project) {
      const projectFilter = project.user_id === userRequest_id
      return projectFilter
    })

    return response.status(200).json(filteredProjects)
  }

  async show(request: Request, response: Response) {
    const {id} = request.params

    const naversProjectsRepository = getCustomRepository(NaversProjectsRepository)

    const project = await naversProjectsRepository
    .findOne({where: {project_id: id},
    relations: ['naver', 'project']
    })
    
    if (!project) {
      return response.status(400).json({error: 'project not found'})  
    }
  
    return response.status(200).json({project})
  }

  async update(request: Request, response: Response) {
    const {name, navers } = request.body
    const {id} = request.params
    const userRequest_id = request.user.id

    const projectRepository = getCustomRepository(ProjectRepository)
    const projectOwnedByUser = await projectRepository.findOne({id})

    if (!projectOwnedByUser) {
      return response.status(400).json({error: 'project not found'})
    }

    if (projectOwnedByUser.user_id != userRequest_id) {
      return response.status(401).json({error: 'user not authorized'})
    }

    await projectRepository
    .update(id,
      {
        name
      })
        
    const naverProjectsMap = navers.map((naver_id: string) => {
      return {
        naver_id,
        project_id: id
      }
    })
    
    const naversProjectsRepository = getCustomRepository(NaversProjectsRepository)

    await naversProjectsRepository.createQueryBuilder()
    .delete()
    .where('project_id = :project_id', {project_id: id})
    .execute()

    const newNaverProject = naversProjectsRepository.create(naverProjectsMap)
    await naversProjectsRepository.save(newNaverProject)

    return response.status(200).json({name, navers})
  }
  
  async delete(request: Request, response: Response) {
    const {id} = request.params

    const projectRepository = getCustomRepository(ProjectRepository)

    const userRequest_id = request.user.id

    const projectOwnedByUser = await projectRepository.findOne({id})

    if (!projectOwnedByUser) {
      return response.status(400).json({error: 'project not found'})
    }

    if (projectOwnedByUser.user_id != userRequest_id) {
      return response.status(401).json({error: 'user not authorized'})
    }

    await projectRepository.delete({id})

    return response.status(200).json({message: 'project deleted'})
  }
}

export default ProjectController