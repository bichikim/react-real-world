export type AnyValidator = (value: any) => boolean

export const withError = (message?: string) => {
  const errorMessage = typeof message === 'undefined' ? true : message
  return (validator: AnyValidator) => (value: any) => {
    return validator(value) ? false : errorMessage
  }
}
