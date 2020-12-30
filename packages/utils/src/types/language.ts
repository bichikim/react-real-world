export type Constructor<P> = {
  new (): P
}

export type AnyFunction<R = any, A extends Array<any> = any[]> = (...args: A) => R
