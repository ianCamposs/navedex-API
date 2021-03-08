import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuid} from 'uuid'
import User from './User'

@Entity('projects')
class Project {

  @PrimaryColumn()
  readonly id: string

  @Column()
  user_id: string

  @ManyToOne(()=> User)
  @JoinColumn({name: 'user_id'})
  user: User

  @Column()
  name: string

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}


export default Project