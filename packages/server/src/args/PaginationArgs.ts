import {ArgsType, Field} from 'type-graphql'

@ArgsType()
export class PaginationArgs {
  @Field()
  skip?: number

  @Field()
  take?: number

  @Field()
  timestamp?: number
}
