import microMemoize, {MicroMemoize} from 'micro-memoize'
import isEqual from 'react-fast-compare'

export type MemoizeOptions = MicroMemoize.Options

// eslint-disable-next-line @typescript-eslint/ban-types
export const deepMemoize = <F extends Function>(
  fc: F | MicroMemoize.Memoized<F>,
  options: MicroMemoize.Options = {},
): MicroMemoize.Memoized<F> => microMemoize(fc, {isEqual, ...options})

/**
 * use deepMemoize
 * @deprecated
 */
export const memoize = deepMemoize
