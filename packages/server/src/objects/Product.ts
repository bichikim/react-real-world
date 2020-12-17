import {Field, ID, ObjectType} from 'type-graphql'

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string

  @Field()
  title: string

  @Field()
  description: string

  @Field({nullable: true})
  thumbnail?: string
}
