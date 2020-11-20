import {observable, observe} from 'mobx'
import {CreateObservableOptions} from 'mobx/src/api/observable'

export interface SubscribeObservableOptions<T> {
  changed?: (state: T) => any
  deepKeys?: string[]
  init?: (state: T) => any
}

export const subscribeObservable = <T>(
  state: T, options: CreateObservableOptions = {},
) => (subscribeOptions: SubscribeObservableOptions<T> = {}) => {
  const {
    init,
    changed,
    deepKeys,
  } = subscribeOptions

  const _state = observable(state, options as any)

  if (init) {
    init(_state)
  }

  if (changed) {
    observe(_state, () => {
      changed(_state)
    })

    if (deepKeys) {
      deepKeys.forEach((key) => {
        observe(_state[key], () => {
          changed(_state)
        })
      })
    }

    changed(_state)
  }

  return _state
}
