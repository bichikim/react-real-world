export type IndexRecord<T extends Record<string, any>> = Record<keyof T, Map<any, T>>

export const setItemToStructure = <T extends Record<string, any>>(
  indexRecord: Record<keyof T, Map<any, T>>,
  item: T,
) => {
  for (const key of Object.keys(indexRecord)) {
    indexRecord[key].set(item[key], item)
  }
}

const getDefaultIndex = <T>(indexes: T[]): T => indexes[0]

const hadItemInStructure = <T extends Record<string, any>, A extends (keyof T)[]>(
  indexRecord: Record<keyof T, Map<any, T>>,
  indexes: A,
  item: T,
): boolean => {

  const key = getDefaultIndex(indexes)
  return indexRecord[key].has(item[key])
}

export const getItemInStructure = <T extends Record<string, any>, K extends keyof T>(
  indexRecord: Record<keyof T, Map<any, T>>,
  key: K,
  value: T[K],
): T | undefined => {
  return indexRecord[key].get(value)
}

export const deleteItemInStructure = <T extends Record<string, any>, A extends (keyof T)[]>(
  indexRecord: Record<keyof T, Map<any, T>>,
  indexes: A,
  item: T,
) => {
  for (const key of indexes) {
    const value = item[key]
    indexRecord[key].delete(value)
  }
}

export const createIndexedStructure = <T extends Record<string, any>, A extends (keyof T)[] = (keyof T)[]>(
  list: T[], indexes: A) => {
  const indexRecord: Record<keyof T, Map<any, T>> = {} as any

  for (const key of indexes) {
    indexRecord[key] = new Map<keyof A, T>()
  }

  for (const item of list) {
    for (const key of indexes) {
      indexRecord[key].set(item[key], item)
    }

  }

  return indexRecord
}

interface MapIterableIterator<T> {
  [Symbol.iterator](): IterableIterator<T>
}

export interface IndexedCollections<T extends Record<string, any>> {
  delete: (item: T) => void
  deleteByKeyValue: <K extends keyof T>(key: K, value: T[K]) => void
  entries: <K extends keyof T>(key: K) => IterableIterator<[K, T]>
  forEach: <K extends keyof T>(key: K, callback: (value: T, key: K, map: Map<K, T[K]>) => void) => void
  get: <K extends keyof T>(key: K, value: T[K]) => T
  has: (item: T) => boolean
  indexRecord: IndexRecord<T>
  keys: <K extends keyof T>(key: K) => IterableIterator<K>
  map: <K extends keyof T, R>(key: K, callback: (value: T, key: K, map: Map<K, T>) => R) => MapIterableIterator<R>
  set: (item: T) => void
  readonly size: number
  values: () => IterableIterator<T>
}

export const createIndexedCollections = <T extends Record<string, any>, A extends (keyof T)[] = (keyof T)[]>(
  list: T[], indexes: A): IndexedCollections<T> => {

  const _indexes = [...indexes]
  const indexRecord = createIndexedStructure(list, _indexes)

  const getDefaultRecord = () => {
    return indexRecord[getDefaultIndex(_indexes)]
  }

  return {
    delete(item: T) {
      return deleteItemInStructure(indexRecord, indexes, item)
    },
    deleteByKeyValue<K extends keyof T>(key: K, value: T[K]) {
      const item = getItemInStructure(indexRecord, key, value)

      if (!item) {
        return
      }

      return deleteItemInStructure(indexRecord, indexes, item)
    },
    entries<K extends keyof T>(key: K) {
      return indexRecord[key].entries()
    },
    forEach<K extends keyof T>(key: K, callback: (value: T, key: K, map: Map<K, T[K]>) => void) {
      return indexRecord[key].forEach(callback)
    },
    get<K extends keyof T>(key: K, value: T[K]) {
      return getItemInStructure(indexRecord, key, value)
    },
    has(item: T) {
      return hadItemInStructure(indexRecord, _indexes, item)
    },
    indexRecord,
    keys<K extends keyof T>(key: K) {
      return indexRecord[key].keys()
    },
    map<K extends keyof T, R>(key: K, callback: (value: T, key: K, map: Map<K, T>) => R): MapIterableIterator<R> {
      const target = indexRecord[key]
      return {
        *[Symbol.iterator]() {
          for (const [key, value] of target.entries()) {
            yield callback(value, key, target)
          }
        },
      }
    },
    set(item: T) {
      if (hadItemInStructure(indexRecord, _indexes, item)) {
        return
      }
      return setItemToStructure(indexRecord, item)
    },
    get size() {
      return getDefaultRecord().size
    },
    values() {
      return getDefaultRecord().values()
    },
  }
}
