import { Request, Response } from "express";
import { getCustomRepository}  from 'typeorm'
import ProjectRepository from "../repositories/ProjectRepository";
import NaversProjectsRepository from '../repositories/NaversProjectsRepository'


class ProjectController {
  async store(request: Request, response: Response) {
    const { name, naver} = request.body

    const userRequest_id = request.user.id

    const projectRepository = getCustomRepository(ProjectRepository)

    const project =  projectRepository.create({
      name,
      user_id: userRequest_id,
    })

    await projectRepository.save(project)

    const naversProjectsRepository = getCustomRepository(NaversProjectsRepository)

    const project_id = project.id
    
    const naverProjectsMap = naver.map((naver_id: string) => {
      return {
        naver_id,
        project_id
      }
    })

    const navers_Projects = naversProjectsRepository.create(naverProjectsMap)
    await naversProjectsRepository.save(navers_Projects)
    /*
    const projectWithNaver = await naversProjectsRepository
    .findOne({where: {project_id: project.id},
    relations: ['naver', 'project']
    }) 
    */
    return response.status(200).json({name: project.name, naver})
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
    
    return response.status(200).json(project)
  }

  async update(request: Request, response: Response) {

  }
  
  async delete(request: Request, response: Response) {
    const {id} = request.body

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