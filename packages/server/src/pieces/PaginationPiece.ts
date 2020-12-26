import {camelCase, clone} from 'lodash'
import plualize from 'pluralize'
import {PaginationArgs} from 'src/args/PaginationArgs'
import {Arg, Args, ClassType, Mutation, Publisher, PubSub, Query, Resolver, Root, Subscription} from 'type-graphql'
import {LessThanOrEqual, Repository} from 'typeorm'
import {InjectRepository} from 'typeorm-typedi-extensions'

export function PaginationPiece<EntityType, AddArasType>(
  Entity: ClassType<EntityType>,
  AddArgs: ClassType<AddArasType>,
) {

  const name = Entity.name.toLocaleLowerCase()
  const singularName = plualize.singular(name)
  const pluralName = plualize.plural(name)
  const changedTopicName = `${pluralName}-changed`

  @Resolver(() => Entity, {isAbstract: true})
  abstract class PaginationResolver {

    @InjectRepository(Entity)
    protected readonly repository: Repository<EntityType>

    @Query(() => [Entity], {
      description: `get ${pluralName}`,
      name: pluralName,
    })
    getSome(@Args() args: PaginationArgs): Promise<EntityType[]> {
      const {take, skip, timestamp} = args

      const where = {}

      if (timestamp) {
        Object.assign(where, {
          createAt: LessThanOrEqual(timestamp),
        })
      }

      return this.repository.find({skip, take, where})
    }

    @Query(() => Entity, {
      description: `get a ${singularName}`,
      name: singularName,
    })
    getOne(@Arg('id') id: string): Promise<EntityType> {
      return this.repository.findOne(id)
    }

    @Mutation(() => Entity, {
      description: `add ${singularName} & pub ${pluralName}`,
      name: camelCase(`add-${singularName}`),
    })
    async addOne(
      @Args(() => AddArgs) args: AddArasType,
        @PubSub(changedTopicName) pubOne: Publisher<EntityType>,
    ): Promise<EntityType> {

      const item = this.repository.create(args)

      const result = await this.repository.save(item)

      await pubOne(clone(result))

      return result
    }

    @Mutation(() => Entity, {
      description: `update ${singularName} & pub ${pluralName}`,
      name: camelCase(`update-${singularName}`),
    })
    async updateOne(
      @Arg('id') id: string,
        @Args(() => AddArgs) args: AddArasType,
    ): Promise<EntityType> {
      const item = await this.repository.findOne(id)

      if (item) {
        await this.repository.update(item, args)
      }

      return this.repository.findOne(id)
    }

    @Mutation(() => Entity, {
      description: `remove ${singularName}`,
      name: camelCase(`remove-${singularName}`),
    })
    async removeOne(
      @Arg('id') id: string,
    ): Promise<EntityType> {
      const item = await this.repository.findOne(id)

      if (item) {
        await this.repository.delete(id)
      }

      return item
    }

    @Subscription(() => Entity, {
      description: `subscribe ${pluralName}`,
      name: camelCase(`sub-${pluralName}`),
      topics: changedTopicName,
    })
    subSome(
      @Root() changedSome: EntityType,
    ): EntityType {
      return changedSome
    }
  }

  return PaginationResolver
}
