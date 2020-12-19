import 'reflect-metadata' // must import first
import {config} from 'dotenv'
import {createRedisPubSub} from 'src/pubsub/create-redis-pub-sub'
import {start} from './server'
config()

start({
  dev: process.env.NODE_ENV === 'development',
  emitSchemaFile: process.env.NODE_ENV === 'generate',
  port: Number(process.env.PORT),
  pubSub: createRedisPubSub({
    host: 'host.docker.internal', // replace with own IP
    port: 6379,
    // eslint-disable-next-line no-magic-numbers
    retryStrategy: (times) => Math.max(times * 100, 3000),
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
