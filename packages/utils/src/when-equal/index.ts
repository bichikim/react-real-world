import {AnyFunction} from 'src/types'
import {whenTrue, WhenTrueOptionsHandy, WhenTrueReturnType} from 'src/when-true'

const defaultIsEqual = <A, B>(a: A, b: B): boolean => Object.is(a, b)

export type IsEqualFunction<A = any, B = any> = (a: A, b: B) => any

export const whenEqual = <Y extends AnyFunction, N extends AnyFunction>(
  a,
  b,
  options: WhenTrueOptionsHandy<Y, N>,
  isEqual = defaultIsEqual,
): WhenTrueReturnType<Y, N> => {
  return whenTrue(() => isEqual(a, b), options)
}
