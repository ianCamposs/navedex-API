import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuid} from 'uuid'
import User from './User'

@Entity('navers')
class Naver {

  @PrimaryColumn()
  readonly id: string

  @Column()
  user_id: string

  @ManyToOne(()=> User)
  @JoinColumn({name: 'user_id'})
  user: User

  @Column()
  name: string

  @Column()
  birthdate: Date

  @Column()
  admission_date: Date

  @Column()
  job_role: string

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}


export default Naver