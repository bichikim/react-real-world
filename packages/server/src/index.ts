import 'reflect-metadata' // muse import first
import {ApolloServer}  from 'apollo-server'
import {buildSchema} from 'type-graphql'
import {config} from 'dotenv'
import {resolvers} from './resolvers'
config()

interface StartOptions {
  emitSchemaFile?: boolean
  port?: number
}

const DEFAULT_PORT = 9090

async function start({emitSchemaFile = true, port = DEFAULT_PORT}: StartOptions = {}) {

  const schema = await buildSchema({
    emitSchemaFile,
    resolvers,
  })

  const server = new ApolloServer({schema})

  if (emitSchemaFile) {
    return
  }

  return server.listen({port})
}


start({
  emitSchemaFile: process.env.NODE_ENV === 'generate',
  port: Number(process.env.PORT),
}).then((info) => {
  // in generate mode
  if (!info) {
    return
  }
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${info.port}`)
}).catch(() => {
  // eslint-disable-next-line no-console
  console.log('Server starting error')
})
