import {AnyFunction, ThenArg} from 'src/types'

interface TreatRequestOptions<T extends AnyFunction> {
  done?: (value: ThenArg<ReturnType<T>>) => any
  error?: (error) => any
  start?: (...args: Parameters<T>) => any[] | void
  trowingError?: boolean
}

export const treatRequest = <T extends AnyFunction>(
  request: T,
  options: TreatRequestOptions<T>,
): ((...args: Parameters<T>) => ReturnType<T>) => {
  const {done, error, start, trowingError = false} = options
  return (...args: Parameters<T>): ReturnType<T> => {
    const newArgs = start?.(...args)

    const promise = request(...(newArgs || args))

    return promise.then((value) => {
      // eslint-disable-next-line promise/no-callback-in-promise
      done && done(value)
      return value
    }).catch((_error) => {
      error && error(_error)
      if (trowingError) {
        throw _error
      }
    })
  }
}
