import isEqual from 'fast-deep-equal'
import {useRef} from 'react'
import {AnyFunction} from 'src/types'

export const useDeepMemo = <T extends AnyFunction>(function_: T, dep): ReturnType<T> => {
  const ref = useRef()
  const result = useRef()

  if (!ref.current) {
    ref.current = {...dep}
    result.current = function_()
    return result.current
  }

  if (isEqual(ref.current, dep)) {
    return result.current
  }

  ref.current = dep
  result.current = function_()
  return result.current
}
