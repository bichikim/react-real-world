import {AnyFunction, Observer} from '@bichi/utils'

export interface WithSubscribeOptions<AC extends AnyFunction> {
  done: (callback: AC) => any
  error: (callback: AC) => any
  inProgress: (callback: AC) => any
}

export type SubscribeFunction<AC extends  AnyFunction, A extends any[]> = (observer: Observer<AC>, ...args: A) => any

export const withSubscribe = <AC extends AnyFunction, A extends any[], R>(function_: SubscribeFunction<AC, A>) => {
  const observer = new Observer<AC>()

  const actor = (...args: A): R => {
    return function_(observer, ...args)
  }

  return Object.assign(actor, {
    subscribe(callback) {
      observer.subscribe(callback)
    },
    unsubscribe(callback) {
      observer.unsubscribe(callback)
    },
  })
}
