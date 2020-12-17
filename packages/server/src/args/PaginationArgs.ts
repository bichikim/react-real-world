import {ArgsType, Field} from 'type-graphql'

@ArgsType()
export class PaginationArgs {
  @Field()
  offset?: number

  @Field()
  take?: number

  @Field()
  timestamp?: number
}
