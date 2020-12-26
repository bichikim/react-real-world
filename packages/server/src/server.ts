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
  database?: Partial<Omit<ConnectionOptions, 'entities'>>
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

export function createServer(options: CreateServerOptions = {}) {

  const {
    emitSchemaFile = true,
    dev,
    pubSub,
    database = {},
  } = options

  const buildSchemaOptions: BuildSchemaOptions = {
    /**
     * logic of the type graphql @Authorized
     * @see https://typegraphql.com/docs/authorization.html
     */
    authChecker,
    container: Container,
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
    host: 'localhost',
    password: 'dev-12345',
    port: 9876,
    synchronize: false,
    type: 'mariadb',
    username: 'dev',
    ...database,
    entities,
    migrations: ['migrations/*.ts'],
  } as any

  // save connection instance
  let connection
  let server

  // prohibit modify a returned object
  return Object.freeze({
    generateSchema() {
      return buildSchema(buildSchemaOptions)
    },
    async start(port: number) {
      // start connect db
      const connectionPromise = createConnection(ormOptions)

      const schemaPromise = buildSchema(buildSchemaOptions)

      const [_connection, schema] = await Promise.all([
        connectionPromise,
        schemaPromise,
      ])

      // save connection
      connection = _connection

      // create apollo server & save it
      server = new ApolloServer({
        ...serverOptions,
        schema,
      })

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
