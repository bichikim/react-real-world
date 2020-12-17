import plualize from 'pluralize'
import {PaginationArgs} from 'src/args/PaginationArgs'
import {Arg, Args, ClassType, Query, Resolver} from 'type-graphql'
import {Resource} from 'src/resource'

export function PaginationPiece<T>(
  Object: ClassType<T>,
  resource: Resource<T>,
) {

  const originName = Object.name.toLocaleLowerCase()

  @Resolver(() => Object, {isAbstract: true})
  abstract class PaginationResolver {

    @Query(() => [Object], {name: plualize.plural(originName)})
    getSome(@Args() args: PaginationArgs): T[] {
      return resource.some(args)
    }

    @Query(() => Object, {name: plualize.singular(originName)})
    getOne(@Arg('id') id: string): T {
      return resource.get(id)
    }
  }

  return PaginationResolver
}
