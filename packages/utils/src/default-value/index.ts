import {ReturnFunction} from 'src/types'
import {mayFunction} from 'src/may-function'

export const defaultValue = <T, D extends T = T>(
  value?: T | ReturnFunction<T>,
  defaultValue?: D | ReturnFunction<D>,
): T | D | undefined => {
  return mayFunction(value) ?? mayFunction(defaultValue)
}
