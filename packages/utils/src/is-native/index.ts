/**
 * 모바일 네이티브 환경인지 확인한다
 */
export const isNative = () => {
  return typeof navigator !== 'undefined' && navigator.product === 'ReactNative'
}

export const IS_NATIVE = isNative()
