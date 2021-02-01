import validator from 'validator'
import {MobilePhoneLocale} from './types'

export interface IsMobilePhone {
  locale?: 'any' | MobilePhoneLocale | MobilePhoneLocale[]
  /**
   * if this is set to `true`, the mobile phone number must be supplied with the country code and therefore must start with `+`.
   *
   * @default false
   */
  strictMode?: boolean
}

export const createIsMobilePhone = (options: IsMobilePhone = {}) => (value: string) => {
  const {locale = 'any', strictMode} = options
  return validator.isMobilePhone(value, locale, {strictMode})
}
