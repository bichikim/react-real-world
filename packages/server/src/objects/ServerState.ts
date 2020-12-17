import {Field, ObjectType} from 'type-graphql'

export enum StateType {
  RUNNING = 'RUNNING',
  STOP = 'STOP'
}

@ObjectType()
export class ServerState {
  @Field(() => StateType)
  value: StateType

  @Field()
  timestamp: number

}

