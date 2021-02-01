/* eslint-disable camelcase */

import validator from 'validator'

export interface IsIntOptions {
  /**
   * if `false`, will disallow integer values with leading zeroes
   * @default true
   */
  allowLeadingZeroes?: boolean
  /**
   * enforce integers being less than the value provided
   */
  gt?: number
  /**
   * enforce integers being greater than the value provided
   */
  lt?: number
  /**
   * to check the integer max boundary
   */
  max?: number
  /**
   * to check the integer min boundary
   */
  min?: number
}

export const createIsInt = (options: IsIntOptions = {}) => (value: string) => {
  const {allowLeadingZeroes: allow_leading_zeroes, ...rest} = options
  return validator.isInt(value, {...rest, allow_leading_zeroes})
}
