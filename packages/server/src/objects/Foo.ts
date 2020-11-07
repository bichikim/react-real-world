import {Field, ID, ObjectType} from 'type-graphql'

@ObjectType()
export class Foo {
  @Field(() => ID)
  id: string

  @Field()
  foo: string

}

export default Foo
