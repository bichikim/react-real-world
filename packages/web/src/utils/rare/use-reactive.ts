import {useCallback, useEffect, useRef, useState} from 'react'
import {Recipe, Store} from './store'

export type Actor = (...args: any[]) => Promise<any> | any

export const useReactive = <S>(store: Store<S>, initState?: Partial<S>): [S, (recipe: Recipe<S>) => any] => {
  const [_state, _setState] = useState(store.state)
  const mutate = useCallback((draft: Recipe<S>) => {
    store.mutate(draft)
  }, [store])
  const [savedStore] = useState(store)
  const ones = useRef(true)

  if (ones.current) {
    ones.current = false

    savedStore.registerHooks(_setState)

    if (initState) {
      store.mutate((draft) => {
        Object.assign(draft, initState)
      })
    }
  }

  useEffect(() => {
    return () => {
      savedStore.unRegisterHooks(_setState)
    }
  }, [savedStore])

  return [_state, mutate]
}

export const createReactive = <S>(store: Store<S>) => (): [S, (recipe: Recipe<S>) => any] => useReactive(store)
