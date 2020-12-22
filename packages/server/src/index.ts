/* eslint-disable no-console */
import 'reflect-metadata' // must import first
import {config} from 'dotenv'
import {createRedisPubSub} from 'src/pubsub/create-redis-pub-sub'
import {createServer} from './server'
config()

// eslint-disable-next-line no-magic-numbers
const retryStrategy = (times) => Math.max(times * 100, 3000)

const DEFAULT_REDIS_PORT = 6379
const DEFAULT_REDIS_HOST = 'host.docker.internal'

const server = createServer({
  dev: process.env.NODE_ENV === 'development',
  emitSchemaFile: process.env.NODE_ENV === 'generate',
  pubSub: createRedisPubSub({
    host: process.env.REDIS_HOST ?? DEFAULT_REDIS_HOST,
    port: Number(process.env.REDIS_PORT) ?? DEFAULT_REDIS_PORT,
    retryStrategy,
  }),
})

// on generate schema mode
if (process.env.NODE_ENV === 'generate') {
  server.generateSchema().then(() => {
    console.log('success schema generation')
  }).catch((error) => {
    console.log('generate schema error', error)
  })

// on serving mode
} else {
  server.start(Number(process.env.PORT)).then((info) => {
    // in generate mode
    if (!info) {
      return
    }
    console.log(`Server is running on http://localhost:${info.port}`)
  }).catch((error) => {
    console.log('Server starting error', error)
  })
}

