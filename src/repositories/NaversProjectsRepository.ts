import { EntityRepository, Repository } from 'typeorm';
import NaversProjects from '../models/NaversProjects';

@EntityRepository(NaversProjects)
class NaversProjectsRepository extends Repository<NaversProjects> {
}

export default NaversProjectsRepository