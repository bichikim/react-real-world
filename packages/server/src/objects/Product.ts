import {Field, ID, ObjectType} from 'type-graphql'

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string

  @Field()
  title: string

  @Field({nullable: true})
  coverImage?: string

  @Field()
  price: number

  @Field()
  score: number

  @Field({nullable: true})
  availableCoupon?: boolean
}
