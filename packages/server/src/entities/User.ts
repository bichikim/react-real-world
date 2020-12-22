import {Field, ObjectType} from 'type-graphql'
import {Column, Entity} from 'typeorm'
import {Common} from './Common'

@ObjectType()
@Entity()
export class User extends Common {
  @Field()
  @Column()
  email: string

  @Field({nullable: true})
  @Column({nullable: true})
  name?: string

  @Column()
  password: string
}
