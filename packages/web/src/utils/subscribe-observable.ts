import {observable, observe} from 'mobx'
import {CreateObservableOptions} from 'mobx/src/api/observable'

export interface SubscribeObservableOptions<T> {
  changed?: (state: T) => any
  init?: () => Partial<T>
}

export const subscribeObservable = <T>(
  state: T, options: CreateObservableOptions = {},
) => (subscribeOptions: SubscribeObservableOptions<T> = {}) => {
  const {
    init,
    changed,
  } = subscribeOptions

  const _state = observable(state, options as any)

  if (init) {
    Object.assign(_state, init())
  }

  if (changed) {
    observe(_state, (value) => {
      changed(value.object)
    })
    changed(_state)
  }

  return _state
}
