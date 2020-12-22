import plualize from 'pluralize'
import {PaginationArgs} from 'src/args/PaginationArgs'
import {Arg, Args, ClassType, Mutation, Publisher, PubSub, Query, Resolver, Root, Subscription} from 'type-graphql'
import {EntitySubscriberInterface, EventSubscriber, InsertEvent, LessThanOrEqual, Repository} from 'typeorm'
import {camelCase, clone} from 'lodash'
import {InjectRepository} from 'typeorm-typedi-extensions'

export function PaginationPiece<T, AA>(
  Entity: ClassType<T>,
  AddArgs: ClassType<AA>,
) {

  const name = Entity.name.toLocaleLowerCase()
  const singularName = plualize.singular(name)
  const pluralName = plualize.plural(name)
  const changedTopicName = `${pluralName}-changed`

  @Resolver(() => Entity, {isAbstract: true})
  @EventSubscriber()
  abstract class PaginationResolver implements EntitySubscriberInterface {

    listenTo() {
      return Entity
    }

    @InjectRepository(Entity)
    protected readonly repository: Repository<T>

    /**
     * called after entity insertion.
     * todo testing orm event
     */
    prafterInsert(event: InsertEvent<any>) {
      console.log('AFTER ENTITY INSERTED:', event.entity)
    }

    @Query(() => [Entity], {
      description: `get ${pluralName}`,
      name: pluralName,
    })
    getSome(@Args() args: PaginationArgs): Promise<T[]> {
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
    getOne(@Arg('id') id: string): Promise<T> {
      return this.repository.findOne(id)
    }

    @Mutation(() => Entity, {
      description: `add ${singularName} & pub ${pluralName}`,
      name: camelCase(`add-${singularName}`),
    })
    async addOne(
      @Args(() => AddArgs) args: AA,
        @PubSub(changedTopicName) pubOne: Publisher<T>,
    ): Promise<T> {
      const result = await this.repository.create(args)

      await pubOne(clone(result))

      return result
    }

    @Subscription(() => Entity, {
      description: `subscribe ${pluralName}`,
      name: camelCase(`sub-${pluralName}`),
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
