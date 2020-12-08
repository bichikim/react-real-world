import {isPromise} from '@bichi/utils'
import {produce} from 'immer'
import {debounce} from 'lodash-es'
import {Dispatch, SetStateAction} from 'react'

// the S = state type

export type SetState<S> = (state: S) => any

export type Recipe<S, R = any> = (draft: S) => R

export type RecipeFactory<S, R = any> = (...args: any[]) => Recipe<S, R>

export type Getter<S, R> = (draft: S) => R

export type Subscribes<S> = (state: S) => any

export const DEFAULT_SUBSCRIBES_DELAY = 75

export interface StoreOptions {
  /**
   * @default true
   */
  asyncSubscribes?: boolean
  delay?: number
  /**
   * @default false
   */
  delaySelf?: boolean
  /**
   * @default 75
   */
  subscribesDelay?: number
}

export class Store<S> {
  private _state: S
  private _hooks: Set<SetState<S>>
  private _subscribes: Set<Subscribes<S>>
  private readonly _delay: number | undefined
  private readonly _delaySelf: boolean
  private readonly _runSubscribes: (newState: S) => any

  constructor(state: S, subscribes: Subscribes<S>[] = [], options: StoreOptions = {}) {
    const {delaySelf = false, delay, subscribesDelay = DEFAULT_SUBSCRIBES_DELAY, asyncSubscribes = true} = options

    this._state = {...state}
    this._hooks = new Set<SetState<S>>()
    this._subscribes = new Set<Subscribes<S>>(subscribes)
    this._delay = delay
    this._delaySelf = delaySelf

    /**
     * create _runSubscribes
     */
    this._runSubscribes = debounce((newState: S) => {
      this._subscribes.forEach((subscribe) => {
        if (asyncSubscribes) {
          setTimeout(() => subscribe(newState))
          return
        }
        subscribe(newState)
      })
    }, subscribesDelay)
  }

  get state() {
    return this._state
  }

  registerHooks(setState: SetState<S>) {
    this._hooks.add(setState)
  }

  unRegisterHooks(setState: SetState<S>) {
    this._hooks.delete(setState)
  }

  replace(state: Partial<S>) {
    this._state = produce(this._state, (draft) => {
      Object.assign(draft, state)
    })
  }

  private _updateState(newState, caller?: Dispatch<SetStateAction<S>>) {
    // save new State
    this._state = newState
    const delay = this._delay
    const delaySelf = this._delaySelf

    if (!delaySelf && caller) {
      caller(newState)
    }

    // announce changed State
    this._hooks.forEach((setState) => {
      if (!delaySelf && setState === caller) {
        return
      }

      if (delay) {
        setTimeout(setState, delay)
        return
      }

      setState(newState)
    })
  }

  mutate<D extends Recipe<S>>(draft: D, caller?: Dispatch<SetStateAction<S>>): Promise<any> | any {
    const oldState = this._state
    const newState = produce(oldState, draft)

    if (isPromise(newState)) {
      return newState.then((data) => {
        this._updateState(data, caller)
        this._runSubscribes(data)
      })
    }

    this._updateState(newState, caller)
    this._runSubscribes(newState)

    return newState
  }

  get<R>(draft: Getter<S, R>): R {
    return draft(this._state)
  }

  action<R>(factory: RecipeFactory<S, R>): (
    ...args: Parameters<RecipeFactory<S, R>>
  ) => ReturnType<ReturnType<RecipeFactory<S, R>>> {
    return (...args: Parameters<RecipeFactory<S, R>>) => {
      return this.mutate(factory(...args))
    }
  }

  getter<R>(factory: Getter<S, R>): () => R {
    return () => {
      return this.get(factory)
    }
  }
}

export type useStore<S> = () => [S, (draft: Recipe<S>) => any]

export const createStore = <S extends Record<string, any>>(
  state: S): Store<S> => {
  return new Store<S>(state)
}

