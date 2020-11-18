/**
 * content Security Policy
 */
export const _self = '\'self\''

export const _unsafeInline = '\'unsafe-inline\''

export const _unsafeEval = '\'unsafe-eval\''

export const defaultSrc = [
  _self,
]

export const styleSrc = [
  _self,
]

export const scriptSrc = [
  _self,
]

export const imgSrc = [_self, 'https:', 'data:']

/**
 * !!caution!!  breaks pdf in chrome
 * @link https://bugs.chromium.org/p/chromium/issues/detail?id=413851
 */
export const sandbox = ['allow-forms', 'allow-scripts', 'allow-same-origin', 'allow-popups']

export interface PoliciesOptions {
  apiUrl: string
  nonce: string
}

export const policies = ({apiUrl, nonce}: PoliciesOptions) => {

  defaultSrc.push(apiUrl)
  styleSrc.push(`'nonce-${nonce}'`)
  scriptSrc.push(`'nonce-${nonce}'`)

  return {
    directives: {
      defaultSrc,
      imgSrc,
      sandbox,
      scriptSrc,
      styleSrc,
    },
  }
}
