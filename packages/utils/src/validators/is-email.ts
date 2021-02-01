/* eslint-disable camelcase */

import validator from 'validator'

export interface IsEmailOptions {
  /**
   * if `allow_display_name` is set to `true`, the validator will also match `Display Name <email-address>`.
   *
   * @default false
   */
  allowDisplayName?: boolean
  /**
   * if `allow_ip_domain` is set to `true`, the validator will allow IP addresses in the host part.
   *
   * @default false
   */
  allowIpDomain?: boolean
  /**
   * if `allow_utf8_local_part` is set to `false`, the validator will not allow any non-English UTF8 character in email address' local part.
   *
   * @default true
   */
  allowUtf8LocalPart?: boolean
  /**
   * if `domain_specific_validation` is `true`, some additional validation will be enabled,
   * e.g. disallowing certain syntactically valid email addresses that are rejected by GMail.
   *
   * @default false
   */
  domainSpecificValidation?: boolean
  /**
   * if `ignore_max_length` is set to `true`, the validator will not check for the standard max length of an email.
   *
   * @default false
   */
  ignoreMaxLength?: boolean
  /**
   * if `require_display_name` is set to `true`, the validator will reject strings without the format `Display Name <email-address>`.
   *
   * @default false
   */
  requireDisplayName?: boolean
  /**
   * if `require_tld` is set to `false`, e-mail addresses without having TLD in their domain will also be matched.
   *
   * @default true
   */
  requireTld?: boolean
}

export const createIsEmail = (options: IsEmailOptions = {}) => (value: string) => {
  const {
    allowDisplayName: allow_display_name,
    allowIpDomain: allow_ip_domain,
    allowUtf8LocalPart: allow_utf8_local_part,
    domainSpecificValidation: domain_specific_validation,
    ignoreMaxLength: ignore_max_length,
    requireDisplayName: require_display_name,
    requireTld: require_tld,
  } = options

  return validator.isEmail(value, {
    allow_display_name,
    allow_ip_domain,
    allow_utf8_local_part,
    domain_specific_validation,
    ignore_max_length,
    require_display_name,
    require_tld,
  })
}
