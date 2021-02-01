/* eslint-disable promise/no-callback-in-promise */
import {isPromise} from '../is-promise'

export type CallbackFyCallback<S, E = any> = (error: null | E, value: S | null) => any

export const callbackify = <S>(
  action: () => Promise<S> | S,
  callback: CallbackFyCallback<S>,
) => {
  let result
  try {
    result = action()
  } catch (error)  {
    callback(error, null)
    return
  }

  if (isPromise(result)) {
    return result.then((data: S) => {
      callback(null, data)
    }).catch((error) => {
      callback(error, null)
    })
  }

  callback(null, result)
  return result
}
