import {useCallback, useEffect, useRef, useState} from 'react'
import {Recipe, Store} from 'src/Store'

export type Actor = (...args: any[]) => Promise<any> | any

// export type UseReactiveReturnType<S> = [S, (recipe: Recipe<S>) => any]

export const useReactive = <S>(store: Store<S>, initState?: Partial<S>): [S, (recipe: Recipe<S>) => any] => {
  const [_state, _setState] = useState(store.state)

  const dispatch = useCallback((recipe) => {
    store.dispatch(recipe, 'dispatch')
  }, [store])

  const [savedStore] = useState(store)

  const ones = useRef(true)

  if (ones.current) {
    ones.current = false

    savedStore.registerDispatcher(_setState)

    if (initState) {

      store.dispatch((draft) => {
        Object.assign(draft, initState)
      }, 'init')
    }
  }

  useEffect(() => {
    return () => {
      savedStore.unRegisterDispatcher(_setState)
    }
  }, [savedStore])

  return [_state, dispatch]
}

export const createReactive = <S>(store: Store<S>) => (): [S, (recipe: Recipe<S>) => any] => useReactive(store)
