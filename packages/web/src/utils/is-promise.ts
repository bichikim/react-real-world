export const isPromise = (promiseLike: any): promiseLike is Promise<any> => {
  if (typeof promiseLike !== 'object') {
    return false
  }

  return typeof promiseLike.then === 'function' && typeof promiseLike.catch === 'function'
}
