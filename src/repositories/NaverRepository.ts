import { EntityRepository, Repository} from 'typeorm'
import Naver from "../models/Naver";

@EntityRepository(Naver)
class NaverRepository extends Repository<Naver> {
}

export default NaverRepository