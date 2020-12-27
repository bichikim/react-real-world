import jwt, {
  JsonWebTokenError,
  SignOptions,
  TokenExpiredError,
  VerifyOptions,
} from 'jsonwebtoken'

export type {TokenExpiredError, SignOptions, VerifyOptions, JsonWebTokenError}

export class TokenRefreshError extends Error {
  readonly token: string

  constructor(message, token) {
    super(message)
    this.token = token
  }
}

const createPromiseCallback = <A>() => {
  let _reject, _resolve

  const callback = (error, data?: any) => {
    if (error) {
      _reject(error)
      return
    }
    _resolve(data)
  }

  return {
    callback,
    promise: new Promise<A>((resolve, reject) => {
      _resolve = resolve
      _reject = reject
    }),
  }
}

export const sign = (
  payload: any,
  key: string | Buffer,
  options?: SignOptions,
) => {
  const {promise, callback} = createPromiseCallback()

  if (options) {
    jwt.sign(payload, key, options, callback)
  } else {
    jwt.sign(payload, key, callback)
  }

  return promise
}

export const verify = (
  token: string,
  key: string | Buffer,
  options?: VerifyOptions,
): Promise<string | Record<string, any>> => {
  const {promise, callback} = createPromiseCallback<string | Record<string, any>>()

  if (options) {
    jwt.verify(token, key, options, callback)
  } else {
    jwt.verify(token, key, callback)
  }

  return promise
}
