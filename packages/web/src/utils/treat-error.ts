import {AnyFunction} from 'src/types'
import {isPromise} from 'src/utils'

export const treatError = <F extends AnyFunction>(handle: F, errorHandle?: (error: any) => any): F => {

  return ((...args) => {
    try {
      const result = handle(...args)

      if (isPromise(result)) {
        result.catch(errorHandle)
        return result
      }
    } catch (error) {
      errorHandle && errorHandle(error)
    }
  }) as any
}
