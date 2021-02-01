import validator from 'validator'

export interface IsLengthOptions {
  /**
   * @default undefined
   */
  max?: number
  /**
   * @default 0
   */
  min?: number
}

export const createIsLength = (options?: IsLengthOptions) => (value: string) => {
  return validator.isLength(value, options)
}
