import {ArgsType, Field} from 'type-graphql'

@ArgsType()
export class AddProductArgs {
  @Field()
  title: string

  @Field()
  description: string
}
