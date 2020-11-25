import {castArray} from 'lodash'

export const castTrulyArray = <T>(
  value: NonNullable<T> | ReadonlyArray<NonNullable<T>> | null | undefined,
): NonNullable<T>[] => {

  if (typeof value === 'undefined' || value === null) {
    return []
  }

  return castArray<NonNullable<T>>(value)
}

