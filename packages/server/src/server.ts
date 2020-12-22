import {ApolloServer}  from 'apollo-server'
import {buildSchema, BuildSchemaOptions} from 'type-graphql'
import {PubSubEngine} from 'graphql-subscriptions'
import {ConnectionOptions, createConnection, useContainer} from 'typeorm'
import {Container} from 'typeDi'
import {resolvers} from './resolvers'
import {entities} from './entities'
import {context} from './context'
import {authChecker} from './auth'

// register 3rd party IOC container
useContainer(Container)

export interface CreateServerOptions {
  /**
   * whether development environment or not
   */
  dev?: boolean
  /**
   * @see BuildSchemaOptions.emitSchemaFile
   */
  emitSchemaFile?: boolean
  pubSub?: PubSubEngine
}

const createSchema = (options: BuildSchemaOptions) => {
  return buildSchema(options)
}

const createApolloServer = (options: any) => {
  return new ApolloServer(options)
}

export function createServer(options: CreateServerOptions = {}) {

  const {
    emitSchemaFile = true,
    dev,
    pubSub,
  } = options

  const buildSchemaOptions: BuildSchemaOptions = {
    /**
     * logic of the type graphql @Authorized
     * @see https://typegraphql.com/docs/authorization.html
     */
    authChecker,
    emitSchemaFile,
    pubSub,

    /**
     * type graphql resolvers
     * @see https://typegraphql.com/docs/resolvers.html
     */
    resolvers,
  }

  const serverOptions: any = {
    // provide shared context
    context,

    // cross-Origin resource sharing options
    cors: {
      credentials: true,
      origin: dev ? '*' : '',
    },

    // serve graphql playground options
    playground: dev && !emitSchemaFile,
  }

  const ormOptions: ConnectionOptions = {
    cache: true,
    database: 'real_db',
    dropSchema: true,
    entities,
    host: 'localhost',
    password: 'dev-12345',
    port: 9876,
    type: 'mysql',
    username: 'dev',
  }

  // save connection instance
  let connection
  let server

  // prohibit modify a returned object
  return Object.freeze({
    generateSchema() {
      return createSchema(buildSchemaOptions)
    },
    async start(port: number) {
      // connect db
      const connectionPromise = createConnection(ormOptions)

      const schema = await createSchema(buildSchemaOptions)
      server = createApolloServer({
        ...serverOptions,
        schema,
      })

      connection = await connectionPromise

      // start listen requests
      return server.listen(port)
    },
    async stop() {

      // only connection exist
      if (connection) {
        // close db connection
        await connection.close()
      }

      // stop listen requests
      return server.stop()
    },
  })
}
