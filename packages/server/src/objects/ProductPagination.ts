import {Product} from 'src/objects/Product'
import {Field, ObjectType} from 'type-graphql'

@ObjectType()
export class ProductPagination {
  @Field(() => [Product])
  list

  @Field()
  offset: number

  @Field()
  take: number

  @Field({nullable: true})
  timestamp: number
}
