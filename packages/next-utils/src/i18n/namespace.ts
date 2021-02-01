import {beTrulyArray} from 'src/utils'
import {NAMESPACE_TRANSLATOR_SYM} from './constants'

export type Namespace = Array<string | number> | string | number | undefined

export type Translator = (name: Array<string | number> | string | number, data?: any, language?: string) => string | any

export interface NamespaceUtils {
  [NAMESPACE_TRANSLATOR_SYM]: Array<string | number>

  add(namespace: Array<string | number> | string | number): NamespaceTranslator

  raw(name: Array<string | number> | string | number, data?: any, language?: string): string
}

export type NamespaceTranslator = NamespaceUtils & Translator

export const margeNamespace = (namespaceA?: Namespace, namespaceB?: Namespace) => {
  return [...beTrulyArray(namespaceA), ...beTrulyArray(namespaceB)]
}

const getFullName = (namespace: Array<string | number>, name: Array<string | number> | string | number) => {
  if (Array.isArray(name)) {
    return [...namespace, ...name]
  }

  return [...namespace, name].join('.')
}

export const createNamespace = (t, namespace?: Namespace): NamespaceTranslator => {
  const _namespace: Array<string | number> = beTrulyArray(namespace)

  const rawExecute = (name: Array<string | number> | string | number, data?: any, language?: string) => {
    const fullName = getFullName(_namespace, name)

    return t(fullName, data, language)
  }

  const execute = (name: Array<string | number> | string | number, data?: any, language?: string) => {
    const result = rawExecute(name, data, language)

    if (result === '' || typeof result === 'undefined' || result === null) {
      return name
    }

    return String(result)
  }

  const translator = (name: Array<string | number> | string | number, data?: any, language?: string) => {
    return String(execute(name, data, language))
  }

  return Object.freeze(
    Object.assign(
      translator,
      {
        [NAMESPACE_TRANSLATOR_SYM]: _namespace,
        add: (namespace: Namespace) => {
          return createNamespace(t, margeNamespace(_namespace, namespace))
        },
        raw: (name: Array<string | number> | string | number, data?: any, language?: string) => {
          return rawExecute(name, data, language)
        },
      }),
  )
}
