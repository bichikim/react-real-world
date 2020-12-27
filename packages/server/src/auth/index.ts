import {AuthChecker} from 'type-graphql'
import {ContextType} from 'src/context'
import {intersection} from 'lodash'
import {verify as _verify, VerifyOptions} from './jwt'

export type Role = string

export type RoleChecker = (require: string[], own: string[]) => boolean

const defaultRoleChecker = (require: string[], own: string[]) => {
  if (require.length === 0) {
    return true
  }
  return intersection(require, own).length > 0
}

export interface AuthCheckerOptions {
  key?: string
  roleChecker?: RoleChecker
  verify?: VerifyOptions
}

export const createAuthChecker = (options: AuthCheckerOptions = {}): AuthChecker<ContextType, Role> =>
  async (data, roles) => {
    const {
      key = 'dev-key',
      verify,
      roleChecker = defaultRoleChecker,
    } = options

    const {context} = data
    const {accessToken} = context

    if (!accessToken) {
      return false
    }

    const decode = await _verify(accessToken, key, verify)

    if (!decode ||
      // decode should have an object user info
      typeof decode === 'string') {
      return false
    }

    const ownRoles = decode.roles ?? []

    return roleChecker(roles, ownRoles)
  }
