import {AnyFunction} from 'src/types'
import {useMemo} from 'react'
import {action} from 'mobx'
import {useRefAct} from 'src/hooks'

export const memoAction = (handle: AnyFunction) => {
  const handleRef = useRefAct(handle)
  return useMemo(() => action(handleRef.current), [handleRef])
}
