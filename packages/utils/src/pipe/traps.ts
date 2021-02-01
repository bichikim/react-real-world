import {isNil, isNull, isUndefined} from 'lodash'
import {createTrap} from './utils'

export const nullTrap = createTrap((result) => !isNull(result))

export const undefinedTrap = createTrap((result) => !isUndefined(result))

export const nilTrap = createTrap((result) => !isNil(result))

