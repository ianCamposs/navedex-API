import { Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid} from 'uuid'

@Entity('users')
class User {

  @PrimaryColumn()
  readonly id: string

  @Column()
  email: string

  @Column()
  password: string

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}


export default User