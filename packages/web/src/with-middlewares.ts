import * as middlewares from 'src/middlewares'
import {middleware as executeMiddleware} from './middleware'

export const withMiddlewares = (function_?: (context) => any) => {
  return async (context) => {
    const props = await executeMiddleware(middlewares, context)

    const result = await function_?.(context)

    return {
      ...result,
      props: {
        ...props, ...result?.props,
      },
    }
  }
}
