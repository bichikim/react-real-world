import {ServerState} from 'src/objects/ServerState'
import {Query, Resolver} from 'type-graphql'
import {ServerStateEnum} from 'src/enums/ServerStateEnum'

@Resolver()
export class ServerStateResolver {

  @Query(() => ServerState)
  async serverState() {
    return Promise.resolve({
      timestamp: new Date().valueOf(),
      value: ServerStateEnum.RUNNING,
    })
  }
}

export default ServerStateResolver
