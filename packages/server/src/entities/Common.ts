import {CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm'
import {Field, ID, ObjectType} from 'type-graphql'

@ObjectType()
export abstract class Common {
  @Field(() => ID)
  @PrimaryGeneratedColumn({})
  id: number

  @Field()
  @CreateDateColumn({type: 'timestamp'})
  createAt: number

  @Field()
  @UpdateDateColumn({type: 'timestamp'})
  updateAt: number
}
