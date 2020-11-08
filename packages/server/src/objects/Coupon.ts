import {Field, ID, ObjectType} from 'type-graphql'

@ObjectType()
export class Coupon {
  @Field(() => ID)
  id: string

  @Field()
  type: string

  @Field()
  title: string

  @Field({nullable: true})
  discountRate?: number

  @Field({nullable: true})
  discountAmount?: number
}
