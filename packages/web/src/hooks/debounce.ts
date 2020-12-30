import {debounce, DebounceSettings} from 'lodash'
import {useCallback, useMemo, useRef} from 'react'

const DEFAULT_DELAY = 250

export interface DebounceOptions extends DebounceSettings {
  getter?: (value: any) => any
}

export type DebounceCallback<S> = (value: S) => any

/**
 * debounce calling
 * callback chain
 * @param callback
 * @param wait
 * @param options
 */
export const useDebounce = <S>(
  callback?: DebounceCallback<S>,
  wait: number = DEFAULT_DELAY,
  options: DebounceOptions = {},
) => {
  const _options = useRef(options)
  _options.current = options
  const _callback = useRef(callback)
  _callback.current = callback
  const _stack = useRef<any[]>([])

  const _debounce = useMemo(
    () => debounce((call) => (call()), wait, options),
    [wait, options],
  )

  return useCallback(
    (value) => {
      const {getter} = _options.current
      const result = getter ? getter(value) : value
      _debounce(() => {
        const callback = _callback.current
        callback && callback(result)
        _stack.current = []
      })
    },
    [_debounce],
  )
}
