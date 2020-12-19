import {registerEnumType} from 'type-graphql'

export enum ServerStateEnum {
  RUNNING = 'RUNNING',
  STOP = 'STOP'
}

registerEnumType(ServerStateEnum, {
  description: 'server state',
  name: 'ServerStateEnum',
})
