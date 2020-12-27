import {ApolloServer} from 'apollo-server'
import {ApolloServerExpressConfig, CorsOptions} from 'apollo-server-express'
import {Request} from 'express'
import {PubSubEngine} from 'graphql-subscriptions'
import {buildSchema, BuildSchemaOptions} from 'type-graphql'
import {Container} from 'typeDi'
import {ConnectionOptions, createConnection, useContainer} from 'typeorm'
import {AuthCheckerOptions, createAuthChecker} from './auth'
import {ContextOptions, createContextFunction} from './context'
import {entities} from './entities'
import {resolvers} from './resolvers'

// register 3rd party IOC container
useContainer(Container)

export interface ApolloConfig extends ApolloServerExpressConfig {
  cors?: CorsOptions | boolean
  onHealthCheck?: (request: Request) => Promise<any>
}

export interface CreateServerOptions {
  auth?: AuthCheckerOptions
  context?: ContextOptions
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
    auth,
    context,
  } = options

  const buildSchemaOptions: BuildSchemaOptions = {
    /**
     * logic of the type graphql @Authorized
     * @see https://typegraphql.com/docs/authorization.html
     */
    authChecker: createAuthChecker(auth),
    container: Container,
    emitSchemaFile,
    pubSub,
    /**
     * type graphql resolvers
     * @see https://typegraphql.com/docs/resolvers.html
     */
    resolvers,
  }

  const serverOptions: ApolloConfig = {
    // provide shared context
    context: createContextFunction(context),

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
