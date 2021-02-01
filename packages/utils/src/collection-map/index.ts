import {arrayToObject} from 'src/array-to-object'
import {arrayToMap} from 'src/array-to-map'

export type ObjectMapIteratee<S = any> = (value: S, key: string, index: number, collection) => any

export type Collection<S> = Record<string, S> | Map<string, S>

const getCollectionValue = <S, K extends string>(collection: Collection<S>, key: K) => {
  if (collection instanceof Map) {
    const result = collection.get(key)

    if (!result) {
      throw new Error('logical key error')
    }
    return result
  }
  return collection[key]
}

const iterateeFactory = <S>(collection: Collection<S>) =>
  (callback: ObjectMapIteratee<S>) => (key: string, index: number) => {
    return callback(getCollectionValue(collection, key), key, index, collection)
  }

const cloneCollection = <S>(collection: Collection<S>) => {
  if (collection instanceof Map) {
    return new Map<string, S>(collection)
  }
  return {...collection}
}

const getCollectionKey = <S>(collection: Collection<S>): string[] => {
  if (collection instanceof Map) {
    return [...collection.keys()]
  }
  return Object.keys(collection)
}

export const objectMapWithKey = <S = any>(
  collection: Collection<S>,
  iteratee: ObjectMapIteratee<S>,
) => {

  const _collection = cloneCollection(collection)

  const keys = getCollectionKey(_collection)

  const result = keys.map(iterateeFactory(collection)(iteratee))

  return {
    keys,
    result,
  }
}

export const collectionMap = <S>(collection: Collection<S>, iteratee: ObjectMapIteratee<S>) => {
  const {result, keys} = objectMapWithKey(collection, iteratee)

  if (collection instanceof Map) {
    return arrayToMap(result, keys)
  }

  return arrayToObject(result, keys)
}

/**
 * @deprecated please use collectionMap instead
 */
export const objectMap = collectionMap

export const collectionAsyncMap = async <S = any>(collection: Collection<S>, iteratee: ObjectMapIteratee<S>) => {
  const {result, keys} = objectMapWithKey(collection, iteratee)

  const _result = await Promise.all(result)

  if (collection instanceof Map) {
    return arrayToMap(_result, keys)
  }

  return arrayToObject(_result, keys)
}

/**
 * @deprecated please use collectionAsyncMap instead
 */
export const objectAsyncMap = collectionAsyncMap
