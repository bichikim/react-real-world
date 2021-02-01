import {mayFunction} from 'src/may-function'
import {AnyFunction, ReturnFunction} from 'src/types'
import {isFunction} from 'src/is-function'

export interface WhenTrueOptions<Y extends AnyFunction, N extends AnyFunction> {
  notPass?: N
  pass?: Y
}

export type WhenTrueReturnType<Y extends AnyFunction, N extends AnyFunction> = undefined | ReturnType<Y> | ReturnType<N>

export type WhenTrueOptionsHandy<Y extends AnyFunction, N extends AnyFunction> = WhenTrueOptions<Y, N> | Y

export const whenTrue = <Y extends AnyFunction, N extends AnyFunction>(
  value: ReturnFunction<any> | any,
  options: WhenTrueOptionsHandy<Y, N>,
): WhenTrueReturnType<Y, N> => {
  const _value = mayFunction(value)

  if (_value) {

    if (isFunction(options)) {
      return options?.()
    }

    return options?.pass?.()
  }

  if (!isFunction(options)) {
    return options?.notPass?.()
  }
}
