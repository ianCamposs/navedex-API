import { EntityRepository, Repository} from 'typeorm'
import Project from '../models/Projects'

@EntityRepository(Project)
class ProjectRepository extends Repository<Project> {
}

export default ProjectRepository