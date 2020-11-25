import {isPromise} from 'src/utils'
import {produce} from 'immer'
import {bind} from 'lodash'

const bindPropertyDescriptor = (descriptor, thisArg) => {
  const myDescriptor = {...descriptor}

  if (typeof myDescriptor.get === 'function') {
    bind(myDescriptor.get, thisArg)
  }

  if (typeof myDescriptor.set === 'function') {
    bind(myDescriptor.set, thisArg)
  }

  if (typeof myDescriptor.value === 'function') {
    bind(myDescriptor.value, thisArg)
  }

  return myDescriptor
}

export const objectBind = <T extends Record<string, any>>(target: T): T => {
  const descriptors = Object.getOwnPropertyDescriptors(target)
  const newObject = {}

  Object.keys(descriptors).forEach((key) => {
    Object.defineProperty(newObject, key, bindPropertyDescriptor(descriptors[key], newObject))
  })

  return newObject as T
}
// the S = state type

export type SetState<S> = (state: S) => any

export type Recipe<S, R = any> = (draft: S) => R

export type RecipeFactory<S, R = any> = (...args: any[]) => Recipe<S, R>

export type Getter<S, R> = (draft: S) => R

export type Subscribes<S> = (state: S) => any

export class Store<S> {
  state: S
  hooks: Set<SetState<S>>
  subscribes: Set<Subscribes<S>>

  constructor(state: S, subscribes: Subscribes<S>[] = []) {
    this.state = {...state}
    this.hooks = new Set<SetState<S>>()
    this.subscribes = new Set<Subscribes<S>>(subscribes)
  }

  registerHooks(setState: SetState<S>) {
    this.hooks.add(setState)
  }

  unRegisterHooks(setState: SetState<S>) {
    this.hooks.delete(setState)
  }

  replace(state: Partial<S>) {
    this.state = produce(this.state, (draft) => {
      Object.assign(draft, state)
    })
  }

  updateState(newState) {
    // save new State
    this.state = newState

    // announce changed State
    this.hooks.forEach((setState) => {
      setState(newState)
    })

    this.subscribes.forEach((subscribe) => {
      subscribe(newState)
    })
  }

  mutate<D extends Recipe<S>>(draft: D): Promise<any> | any {
    const oldState = this.state
    const newState = produce(oldState, draft)

    if (isPromise(newState)) {
      return newState.then((data) => {
        this.updateState(data)
      })
    }

    this.updateState(newState)

    return newState
  }

  get<R>(draft: Getter<S, R>): R {
    return draft(this.state)
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

