import {camelCase, clone} from 'lodash'
import plualize from 'pluralize'
import {PaginationArgs} from 'src/args/PaginationArgs'
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

export function ToggleDecorator<Args extends unknown[]>(toggle: boolean, Decorator, ...args: Args) {
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

export interface ArgOptions<ADD, UPDATE> {
  add: ADD
  update: UPDATE
}

export function CrudPiece<
  EntityType extends ClassType,
  AddArasType extends ClassType,
  UpdateArgsType extends ClassType
>(
  Entity: EntityType,
  args: ArgOptions<AddArasType, UpdateArgsType>,
  authOptions: AuthOptions = {},
) {

  const {createOne, getOne, getSome, updateOne, removeOne} = authOptions
  const name = Entity.name.toLocaleLowerCase()
  const singularName = plualize.singular(name)
  const pluralName = plualize.plural(name)
  const changedTopicName = `${pluralName}-changed`

  @ObjectType()
  class PubSubSome extends Entity {
    @Field(() => CrudAction)
    _action: CrudAction
  }

  @Resolver(() => Entity, {isAbstract: true})
  abstract class PaginationResolver {

    @InjectRepository(Entity)
    protected readonly repository: Repository<InstanceType<EntityType>>

    @ToggleDecorator(Boolean(getSome), Authorized, getSome)
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

    @ToggleDecorator(Boolean(getOne), Authorized, getOne)
    @Query(() => Entity, {
      description: `get a ${singularName}`,
      name: singularName,
      nullable: true,
    })
    getOne(@Arg('id') id: string): Promise<EntityType | undefined> {
      return this.repository.findOne(id)
    }

    @ToggleDecorator(Boolean(createOne), Authorized, createOne)
    @Mutation(() => Entity, {
      description: `add ${singularName} & pub ${pluralName}`,
      name: camelCase(`add-${singularName}`),
    })
    async createOne(
      @Args(() => args.add) args: InstanceType<AddArasType>,
        @PubSub(changedTopicName) pubSome: Publisher<[PubSubSome]>,
    ): Promise<EntityType> {

      const item = this.repository.create(args)

      const result = await this.repository.save(item)

      await pubSome([{
        ...clone(result),
        _action: CrudAction.CREATE,
      }])

      // type buggy
      return result as any
    }

    @ToggleDecorator(Boolean(updateOne), Authorized, updateOne)
    @Mutation(() => Entity, {
      description: `update ${singularName} & pub ${pluralName}`,
      name: camelCase(`update-${singularName}`),
      nullable: true,
    })
    async updateOne(
      @Arg('id') id: string,
        @Args(() => args.update) args: InstanceType<UpdateArgsType>,
        @PubSub(changedTopicName) pubSome: Publisher<[PubSubSome]>,
    ): Promise<EntityType | undefined> {
      const item = await this.repository.findOne(id)

      if (!item) {
        return
      }

      Object.assign(item, args)
      const result = await this.repository.save(item)

      await pubSome([{
        ...clone(result),
        _action: CrudAction.UPDATE,
      }])

      return result
    }

    @ToggleDecorator(Boolean(removeOne), Authorized, removeOne)
    @Mutation(() => Entity, {
      description: `remove ${singularName}`,
      name: camelCase(`remove-${singularName}`),
      nullable: true,
    })
    async removeOne(
      @Arg('id') id: string,
        @PubSub(changedTopicName) pubSome: Publisher<[PubSubSome]>,
    ): Promise<EntityType | undefined> {
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
