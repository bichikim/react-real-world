import {ArgsType, Field} from 'type-graphql'
import {MaxLength} from 'class-validator'

@ArgsType()
export class AddProductArgs {
  @Field()
  @MaxLength(250)
  title: string

  @Field()
  description: string
}
