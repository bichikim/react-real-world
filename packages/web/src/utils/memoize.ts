import microMemoize, {MicroMemoize} from 'micro-memoize'
import isEqual from 'react-fast-compare'
import {AnyFunction} from 'src/types'

export type MemoizeOptions = MicroMemoize.Options
export const memoize = <Function_ extends AnyFunction>(
  fc: Function_ | MicroMemoize.Memoized<Function_>,
  options: MicroMemoize.Options = {},
) => microMemoize(fc, {isEqual, ...options})
