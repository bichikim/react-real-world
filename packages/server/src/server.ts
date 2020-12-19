import {ApolloServer}  from 'apollo-server'
import {buildSchema} from 'type-graphql'
import {PubSubEngine} from 'graphql-subscriptions'
import {resolvers} from './resolvers'
import {context} from './context'
import {authChecker} from './auth'

interface StartOptions {
  dev?: boolean
  emitSchemaFile?: boolean
  port?: number
  pubSub?: PubSubEngine
}

const DEFAULT_PORT = 9090

export async function start(options: StartOptions = {}) {

  const {
    emitSchemaFile = true,
    port = DEFAULT_PORT,
    dev,
    pubSub,
  } = options

  const schema = await buildSchema({
    authChecker,
    emitSchemaFile,
    pubSub,
    resolvers,
  })

  const server = new ApolloServer({
    context,
    cors: {
      credentials: true,
      origin: dev ? '*' : '',
    },
    playground: dev && !emitSchemaFile,
    schema,
  })

  if (emitSchemaFile) {
    return
  }

  return server.listen({port})
}
