import {callbackify, isPromise, Observer} from '@bichi/utils'
import {Draft, produce} from 'immer'
import {withSubscribe} from './with-subscribe'

export type ActionState = 'done' | 'idle' | 'in-progress' | 'error'

export type SetState<S> = (state: S) => any

export type Recipe<S> = (draft: Draft<S>) => any

export type Mutate<S, A extends any[], R = any> = (draft: Draft<S>, ...args: A) => R

export type Getter<S, R> = (draft: S) => R

export type Action<A extends any[], R> = (...args: A) => R

export type ActionCallback = (state: ActionState, message?: string) => any

export type MutateReturnType<A extends any[], R> = (...args: A) => Promise<R> | R

export interface ActionReturnType<A extends any[], R> {
  (...args: A): Promise<R> | R
  subscribe(callback: ActionCallback): any
  unsubscribe(callback: ActionCallback): any
}

export type SubscribesKind = 'mutation' | 'action' | 'dispatch'

export type Subscribes<S> = (state: S, kind: SubscribesKind, type: string) => any

export type StateFunction<S> = (store: Store<S>) => S

export class Store<S> {
  state: S
  private dispatchers: Observer<SetState<S>>
  private subscribes: Observer<Subscribes<S>>

  constructor(state: S, subscribes: Subscribes<S>[] = []) {
    this.state = {...state}
    this.dispatchers = new Observer<SetState<S>>()
    this.subscribes = new Observer<Subscribes<S>>()
    this.subscribes.subscribeMany(subscribes)
  }

  registerSubscribes(subscribes: Subscribes<S>) {
    this.subscribes.subscribe(subscribes)
  }

  unRegisterSubscribes(subscribes: Subscribes<S>) {
    this.subscribes.unsubscribe(subscribes)
  }

  registerDispatcher(setState: SetState<S>) {
    this.dispatchers.subscribe(setState)
  }

  unRegisterDispatcher(setState: SetState<S>) {
    this.dispatchers.unsubscribe(setState)
  }

  private updateState(newState, kind: SubscribesKind, type: string = 'update') {
    // save new State
    this.state = newState

    // announce changed State
    this.fireDispatchers(newState)

    this.fireSubscribes(newState, kind, type)

    return newState
  }

  private fireDispatchers(newSate: S) {
    this.dispatchers.fire((setState) => {
      setState(newSate)
    })
  }

  private fireSubscribes(newState: S, kind: SubscribesKind, type: string = 'action') {
    this.subscribes.fire((subscribe) => {
      subscribe(newState, kind, type)
    })
  }

  dispatch(recipe: Recipe<S>, type?: string) {
    const oldState = this.state
    const newState = produce(oldState, recipe)
    const kind: SubscribesKind = 'dispatch'

    if (isPromise(newState)) {
      return newState.then((data) => {
        return this.updateState(data, kind, type)
      })
    }

    return this.updateState(newState, kind, type)
  }

  // wrap as mutation
  mutate<A extends any[], R>(recipe: Mutate<S, A, R>, type?: string): MutateReturnType<A, R> {
    return (...args) => {

      return this.dispatch((draft) => {
        return recipe(draft, ...args)
      }, type)
    }
  }

  // wrap as action
  action<A extends any[], R>(
    recipe: Action<A, R>,
    type?: string,
  ): ActionReturnType<A, R> {
    const kind: SubscribesKind = 'action'

    const action = (observer, ...args: A) => {
      const callback = (error) => {
        if (error) {
          observer.fire((setState) => {
            setState('error', error)
          })
          return
        }

        this.fireSubscribes(this.state, kind, type)
        observer.fire((setState) => {
          setState('done')
        })
      }

      observer.fire((setState) => {
        setState('in-progress')
      })

      return callbackify(() => recipe(...args), callback)
    }

    return withSubscribe<ActionCallback, A, R>(action)
  }

  // wrap as getter
  getter<R>(recipe: Getter<S, R>): () => R {
    return () => {
      return recipe(this.state)
    }
  }
}

export const createStore = <S extends Record<string, any>>(
  state: S): Store<S> => {
  return new Store<S>(state)
}
