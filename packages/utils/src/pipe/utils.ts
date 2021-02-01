import {isPromise} from 'src/is-promise'
import {kindSym} from './symbol'
import {PipeFunction, Trap, Wrap} from './types'

export class PipeTrapExit extends Error {

  private readonly _value

  get value() {
    return this._value
  }

  constructor(message, value) {
    super(message)
    this._value = value
  }
}

export const createTrap = (function_: Trap): Trap => {
  return Object.assign(function_, {[kindSym]: 'trap' as const})
}

const handleTrap = (value, trap) => {
  if (trap && !trap(value)) {
    throw new PipeTrapExit('trap exit', value)
  }

  return value
}

export const createExecute = (trap?: Trap | null, wrap?: Wrap | null, arg?: any) => {
  return (function_: PipeFunction, index: number) => (value: any): any => {
    const _function = wrap ? wrap(function_, arg, index) : function_

    const result = _function(value)

    if (isPromise(result)) {
      return result.then((result) => {
        return handleTrap(result, trap)
      })
    }

    return handleTrap(result, trap)
  }
}

export const createWrap = <A extends any[] = any[], R = any>(wrap: Wrap<A, R>): Wrap<A, R> => {
  return Object.assign(wrap, {[kindSym]: 'wrap' as const})
}
