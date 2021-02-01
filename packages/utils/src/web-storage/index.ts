
export type StorageName = 'local' | 'session'

export const getWebStorageModule = (name: StorageName): Storage | undefined => {
  if (name === 'local') {
    return window.localStorage
  }
  if (name === 'session') {
    return window.sessionStorage
  }

}

export const getWebStorage = <T = any>(kind: StorageName, name: string, defaultValue: T = {} as any) => {
  const module: Storage | undefined = getWebStorageModule(kind)

  if (!module) {
    return defaultValue
  }

  const raw = module.getItem(name)

  if (!raw) {
    return defaultValue
  }

  try {
    return JSON.parse(raw)
  } catch {
    return defaultValue
  }
}

export const setWebStorage = <T = any>(kind: StorageName, name: string, value: T) => {
  const module: Storage | undefined = getWebStorageModule(kind)

  if (!module) {
    return
  }

  module.setItem(name, JSON.stringify(value))
}
