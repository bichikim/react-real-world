import {Field, ObjectType} from 'type-graphql'
import {Column, Entity} from 'typeorm'
import {Common} from './Common'

@ObjectType()
@Entity()
export class Product extends Common {
  @Field()
  @Column()
  title: string

  @Field()
  @Column()
  description: string

  @Field({nullable: true})
  @Column({nullable: true})
  thumbnail?: string
}
