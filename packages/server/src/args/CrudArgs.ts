import {ArgsType, Field} from 'type-graphql'

@ArgsType()
export class CrudArgs {
  @Field()
  skip?: number

  @Field()
  take?: number

  @Field()
  timestamp?: number
}
