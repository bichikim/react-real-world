/**
 * ssr 환경인지 여부를 확인 한다
 */

declare global {
  interface Window {
    ssr: any
  }
}

export function isSSR() {

  if (process.env.NODE_ENV === 'test') {
    return window.ssr
  }

  /* istanbul ignore next */
  return typeof window === 'undefined'
}

export const IS_SSR = isSSR()
