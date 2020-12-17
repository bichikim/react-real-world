import {ServerState, StateType} from 'src/objects/ServerState'
import {Query, Resolver} from 'type-graphql'

@Resolver()
export class ServerStateResolver {

  @Query(() => ServerState)
  async serverState(): Promise<ServerState> {
    return Promise.resolve({
      timestamp: new Date().valueOf(),
      value: StateType.RUNNING,
    })
  }
}

export default ServerStateResolver
