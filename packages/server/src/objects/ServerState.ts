import {Field, ObjectType} from 'type-graphql'
import {ServerStateEnum} from 'src/enums/ServerStateEnum'

@ObjectType()
export class ServerState {
  @Field(() => ServerStateEnum)
  value: ServerStateEnum

  @Field()
  timestamp: number

}

