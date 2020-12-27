import {camelCase, clone} from 'lodash'
import plualize from 'pluralize'
import {CrudArgs} from 'src/args/CrudArgs'
import {CrudAction} from 'src/enums/CrudAction'
import {
  Arg,
  Args,
  Authorized,
  ClassType,
  createMethodDecorator,
  Field,
  Mutation,
  ObjectType,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
} from 'type-graphql'
import {Role} from 'src/auth'
import {LessThanOrEqual, Repository} from 'typeorm'
import {InjectRepository} from 'typeorm-typedi-extensions'

export function ToggleDecorator<Args extends any[]>(toggle: boolean, Decorator, ...args: Args) {
  if (toggle) {
    return Decorator(...args)
  }
  return createMethodDecorator((_, next) => {
    return next()
  })
}

export interface AuthOptions {
  createOne?: Role[]
  getOne?: Role[]
  getSome?: Role[]
  removeOne?: Role[]
  updateOne?: Role[]
}

export function CrudPiece<EntityType, AddArasType>(
  Entity: ClassType<EntityType>,
  AddArgs: ClassType<AddArasType>,
  authOptions: AuthOptions = {},
) {

  const {createOne, getOne, getSome, updateOne, removeOne} = authOptions
  const name = Entity.name.toLocaleLowerCase()
  const singularName = plualize.singular(name)
  const pluralName = plualize.plural(name)
  const changedTopicName = `${pluralName}-changed`

  @ObjectType()
  class PubSubSome extends (Entity as any) {
    @Field(() => CrudAction)
    _action: CrudAction
  }

  @Resolver(() => Entity, {isAbstract: true})
  abstract class PaginationResolver {

    @InjectRepository(Entity)
    protected readonly repository: Repository<EntityType>

    @ToggleDecorator(Boolean(getSome), Authorized, getSome)
    @Query(() => [Entity], {
      description: `get ${pluralName}`,
      name: pluralName,
    })
    getSome(@Args() args: CrudArgs): Promise<EntityType[]> {
      const {take, skip, timestamp} = args

      const where = {}

      if (timestamp) {
        Object.assign(where, {
          createAt: LessThanOrEqual(timestamp),
        })
      }

      return this.repository.find({skip, take, where})
    }

    @ToggleDecorator(Boolean(getOne), Authorized, getOne)
    @Query(() => Entity, {
      description: `get a ${singularName}`,
      name: singularName,
    })
    getOne(@Arg('id') id: string): Promise<EntityType> {
      return this.repository.findOne(id)
    }

    @ToggleDecorator(Boolean(createOne), Authorized, createOne)
    @Mutation(() => Entity, {
      description: `add ${singularName} & pub ${pluralName}`,
      name: camelCase(`add-${singularName}`),
    })
    async createOne(
      @Args(() => AddArgs) args: AddArasType,
        @PubSub(changedTopicName) pubSome: Publisher<[PubSubSome]>,
    ): Promise<EntityType> {

      const item = this.repository.create(args)

      const result = await this.repository.save(item)

      await pubSome([{
        ...clone(result),
        _action: CrudAction.CREATE,
      }])

      return result
    }

    @ToggleDecorator(Boolean(updateOne), Authorized, updateOne)
    @Mutation(() => Entity, {
      description: `update ${singularName} & pub ${pluralName}`,
      name: camelCase(`update-${singularName}`),
    })
    async updateOne(
      @Arg('id') id: string,
        @Args(() => AddArgs) args: AddArasType,
        @PubSub(changedTopicName) pubSome: Publisher<[PubSubSome]>,
    ): Promise<EntityType> {
      const item = await this.repository.findOne(id)

      if (item) {
        await this.repository.update(item, args)
      }

      const result = await this.repository.findOne(id)

      if (item) {
        await pubSome([{
          ...clone(result),
          _action: CrudAction.UPDATE,
        }])
      }

      return result
    }

    @ToggleDecorator(Boolean(removeOne), Authorized, removeOne)
    @Mutation(() => Entity, {
      description: `remove ${singularName}`,
      name: camelCase(`remove-${singularName}`),
    })
    async removeOne(
      @Arg('id') id: string,
        @PubSub(changedTopicName) pubSome: Publisher<[PubSubSome]>,
    ): Promise<EntityType> {
      const item = await this.repository.findOne(id)

      if (item) {
        await this.repository.delete(id)
        await pubSome([{
          ...clone(item),
          _action: CrudAction.REMOVE,
        }])
      }

      return item
    }

    @Subscription(() => [PubSubSome], {
      description: `subscribe ${pluralName}`,
      name: camelCase(`sub-${pluralName}`),
      topics: changedTopicName,
    })
    subSome(
      @Root() changedSome: [EntityType],
    ): EntityType[] {
      return changedSome
    }
  }

  return PaginationResolver
}
