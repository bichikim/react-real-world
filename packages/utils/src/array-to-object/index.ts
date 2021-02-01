export const arrayToObject = <S = any>(collection: S[], keys: string[]) => {

  return keys.reduce((previousValue, key, index) => {
    const value = collection[index]

    if (!value) {
      return previousValue
    }

    previousValue[key] = value
    return previousValue
  }, {})
}
