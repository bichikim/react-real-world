import {useMemo} from 'react'
import {AnyFunction} from 'src/types'

export const useOnce = (function_: AnyFunction) => {
  useMemo(() => {
    function_()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
