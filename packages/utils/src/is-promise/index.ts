/**
 * 프로마이즈 객체 인지 확인한다 (런타임)
 * @param value
 */
export function isPromise(value): value is Promise<any> {
  return Boolean(value && typeof value.then === 'function')
}
