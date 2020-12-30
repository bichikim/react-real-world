/* eslint-disable promise/no-callback-in-promise */
import {isPromise} from 'src/is-promise'

export const callbackify = <S>(
  action: () => PromiseLike<S> | S,
  callback: (error: any, value: S | null) => any,
) => {
  let result
  try {
    result = action()
  } catch (error)  {
    callback(error, null)
    return
  }

  if (isPromise(result)) {
    return result.then((data) => {
      callback(null, data)
    }).catch((error) => {
      callback(error, null)
    })
  }

  callback(null, result)
  return result
}
