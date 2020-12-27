import {registerEnumType} from 'type-graphql'

export enum CrudAction {
  CREATE = 'CREATE',
  REMOVE = 'REMOVE',
  UPDATE = 'UPDATE'
}

registerEnumType(CrudAction, {
  description: 'pagination action type',
  name: 'CrudAction',
})

