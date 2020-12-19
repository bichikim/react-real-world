import {RedisPubSub} from 'graphql-redis-subscriptions'
import IORedis, {RedisOptions} from 'ioredis'

export const createRedisPubSub = (options: RedisOptions) => {
  return new RedisPubSub({
    publisher: new IORedis(options),
    subscriber: new IORedis(options),
  })
}
