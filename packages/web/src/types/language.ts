
export type EmptyObject = {
  // empty
}

export type  AnyFunction = (...args: any[]) => any

export type AnyObject<T = any> = Record<number | string | symbol, T>

export type PureObject<T = any> = Record<string, T>

export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
