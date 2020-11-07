import {Foo} from 'src/objects/Foo'
import {Query, Resolver} from 'type-graphql'

@Resolver(Foo)
export class FooResolver {

  @Query(() => Foo)
  async foo() {
    return {foo: 'foo'}
  }
}

export default FooResolver
