import {IS_SSR} from 'src/utils'

export type StorageType = 'local' | 'session'

export const getStorage = (type: StorageType) => {
  if (type === 'local') {
    return localStorage
  }
  return sessionStorage
}

export const getStorageValue = (type: StorageType) => (name: string) => (): Record<string, any> => {
  if (IS_SSR) {
    return {}
  }

  const storage = getStorage(type)

  try {
    const data = storage.getItem(name)
    if (!data) {
      return {}
    }
    return JSON.parse(data)
  } catch {
    return {}
  }
}

export const saveStorageValue = (type: StorageType) => (name: string) => (data: Record<string, any>) => {
  if (IS_SSR) {
    return {}
  }

  const storage = getStorage(type)

  try {
    storage.setItem(name, JSON.stringify(data))
  } catch {
    if (process.env.NODE_ENV === 'development') {
      console.warn(data, 'cannot be a Json string')
    }
  }
}
