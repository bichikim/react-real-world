export function isSSR() {
  return typeof window === 'undefined'
}

export const IS_SSR = isSSR()
