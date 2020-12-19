import 'reflect-metadata' // must import first
import {config} from 'dotenv'
import {createRedisPubSub} from 'src/pubsub/create-redis-pub-sub'
import {start} from './server'
config()

// eslint-disable-next-line no-magic-numbers
const retryStrategy = (times) => Math.max(times * 100, 3000)

const DEFAULT_REDIS_PORT = 6379
const DEFAULT_REDIS_HOST = 'host.docker.internal'

start({
  dev: process.env.NODE_ENV === 'development',
  emitSchemaFile: process.env.NODE_ENV === 'generate',
  port: Number(process.env.PORT),
  pubSub: createRedisPubSub({
    host: process.env.REDIS_HOST ?? DEFAULT_REDIS_HOST,
    port: Number(process.env.REDIS_PORT) ?? DEFAULT_REDIS_PORT,
    retryStrategy,
  }),
}).then((info) => {
  // in generate mode
  if (!info) {
    return
  }
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${info.port}`)
}).catch((error) => {
  // eslint-disable-next-line no-console
  console.log('Server starting error', error)
})
