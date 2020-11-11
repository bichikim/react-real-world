import {MutableRefObject, useRef} from 'react'

export const useRefAct = <T>(state: T): MutableRefObject<T | undefined> => {
  const ref = useRef<T | undefined>()
  ref.current = state
  return ref
}
