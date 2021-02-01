export const arrayToMap = <S>(collection: S[], keys: string[]) => {

  return keys.reduce((previousValue, key, index) => {
    const value = collection[index]

    if (!value) {
      return previousValue
    }

    previousValue.set(key, value)
    return previousValue
  }, new Map<string, S>())
}
