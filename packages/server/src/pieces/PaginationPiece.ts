import plualize from 'pluralize'
import {PaginationArgs} from 'src/args/PaginationArgs'
import {Arg, Args, ClassType, Mutation, Publisher, PubSub, Query, Resolver, Root, Subscription} from 'type-graphql'
import {Resource} from 'src/resource'

export function PaginationPiece<T, AA>(
  Object: ClassType<T>,
  AddArgs: ClassType<AA>,
  resource: Resource<T, AA>,
) {

  const name = Object.name.toLocaleLowerCase()
  const singularName = plualize.singular(name)
  const pluralName = plualize.plural(name)
  const changedTopicName = `${pluralName}-changed`

  @Resolver(() => Object, {isAbstract: true})
  abstract class PaginationResolver {

    @Query(() => [Object], {
      description: `get ${pluralName}`,
      name: pluralName,
    })
    getSome(@Args() args: PaginationArgs): Promise<T[]> {
      return resource.some(args)
    }

    @Query(() => Object, {
      description: `get a ${singularName}`,
      name: singularName,
    })
    getOne(@Arg('id') id: string): Promise<T> {
      return resource.get(id)
    }

    @Mutation(() => Object, {
      description: `add ${singularName}`,
      name: `add-${singularName}`,
    })
    async addOne(
      @Args(() => AddArgs) args: AA,
        @PubSub(changedTopicName) pubOne: Publisher<T>,
    ): Promise<T> {
      const result = await resource.add(args)

      await pubOne({
        ...result,
      })

      return result
    }

    @Subscription(() => Object, {
      description: `subscribe ${pluralName}`,
      topics: changedTopicName,
    })
    subSome(
      @Root() changedSome: T,
    ): T {
      return changedSome
    }
  }

  return PaginationResolver
}
