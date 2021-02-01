import {ReturnFunction} from 'src/types'
import {isFunction} from 'src/is-function'

export const mayFunction = <T>(value: T | ReturnFunction<T>): T => {
  return isFunction(value) ? value() : value
}
