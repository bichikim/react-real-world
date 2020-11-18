import {NextPageContext} from 'next'
import {IS_SSR} from 'src/utils'

export type MiddlewareContext = Required<Omit<NextPageContext, 'err' | 'asPath'>> &
Pick<NextPageContext, 'err' | 'asPath'>

export interface Middleware {
  match?: RegExp

  (
    context: Required<Omit<NextPageContext, 'err' | 'asPath'>> &
    Pick<NextPageContext, 'err' | 'asPath'>,
  ): Promise<any> | any
}

export function matchAndRun(path: string, context: MiddlewareContext, middleware: Middleware) {
  if (typeof middleware !== 'function') {
    if (process.env.NODE_ENV === 'development') {
      console.error('[middlewares] A middlewares must be a function')
    }
    return null
  }

  const {match} = middleware

  if (match) {
    if (match.test(path)) {
      return middleware(context)
    }
    return null
  }
  return middleware(context)
}

/**
 * run middlewares
 * @param middlewares
 * @param context
 */
export const middleware = async (
  middlewares: Record<string | symbol, Middleware>,
  context: NextPageContext,
): Promise<any> => {

  const {pathname} = context

  const {req, res, ...rest} = context

  if (!IS_SSR || !req || !res) {
    return Promise.resolve({})
  }

  const _context = {req, res, ...rest}

  const keys = Object.keys(middlewares)

  const result = await Promise.all(
    keys.map((key) => {
      const middleware = middlewares[key]

      return matchAndRun(pathname, _context, middleware)
    }, []),
  )

  return result.reduce((result, item, index) => {
    if (!item) {
      return result
    }

    const key = keys[index]
    result[key] = item
    return result
  }, {})
}

export default middleware
