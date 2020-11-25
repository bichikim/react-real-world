/* eslint-disable unicorn/prevent-abbreviations */
import {GetServerSideProps} from 'next'
import {createContext, createElement as h,  useContext, useMemo} from 'react'
import rosetta, {Rosetta} from 'rosetta'
import {castTrulyArray} from 'src/utils'

export const DEFAULT_LANGUAGE = 'ko'
export const I18N_NAME = '__i18n__'
const NAMESPACE_T_SYM = Symbol('namespace-t')

export type Namespace = Array<string | number> | string | number | undefined

export interface NamespaceT {
  [NAMESPACE_T_SYM]: Array<string | number>

  (name: Array<string | number> | string | number, data?: any, language?: string): string | any

  add(namespace: Array<string | number> | string | number): NamespaceT

  raw(name: Array<string | number> | string | number, data?: any, language?: string): string
}

export interface Rosetta2 extends Rosetta<any> {
  __t?: any
  t: NamespaceT
}

/**
 * todo it should use context
 */
export const getLanguage = (
  // context: any
) => {
  return DEFAULT_LANGUAGE
}

export interface MessageMap {
  [key: string]: () => Promise<any> | any
}

export const getServerSideProps = async (context, func?: GetServerSideProps) => {
  let result: any = func ? await func(context) : {props: {}}

  if (!result) {
    result = {}
  }

  if (!result.props) {
    result.props = {}
  }
  return result
}

const getMessage = async (language, message: MessageMap) => {
  const messageLoader = message[language]

  const myMessage = messageLoader ? await messageLoader() : {}

  const noEsMessage = myMessage.default || myMessage

  if (Array.isArray(noEsMessage)) {
    const newMessage = {}
    noEsMessage.forEach((result) => {
      if (typeof result === 'object') {
        Object.assign(newMessage, result.default || result)
      }
    })
    return newMessage
  }

  return {...noEsMessage}
}

export const getI18nProp = (props) => {
  const {message, language} = props[I18N_NAME] || {}
  return {
    language,
    message,
  }
}

const multiSym = Symbol('multi-message')

export const multiMessage = (list: Record<string, Promise<any>>) => {
  const caller = async () => {
    const keys = Object.keys(list)
    const result = await Promise.all(Object.values(list))
    const newResult = {}
    result.forEach((result, index) => {
      newResult[keys[index]] = result.default || result
    })

    return newResult
  }

  Object.assign(caller, {
    [multiSym]: true,
  })

  return caller
}

const createNamespace = (t, namespace?: Namespace): NamespaceT => {
  const _namespace: Array<string | number> = castTrulyArray(namespace)

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
  return Object.freeze(
    Object.assign((name: Array<string | number> | string | number, data?: any, language?: string) => {
      return String(execute(name, data, language))
    },
    {
      [NAMESPACE_T_SYM]: _namespace,
      add: (namespace: Namespace) => {
        return createNamespace(t, margeNamespace(_namespace, namespace))
      },
      raw: (name: Array<string | number> | string | number, data?: any, language?: string) => {
        return rawExecute(name, data, language)
      },
    }),
  )
}

const createRosetta = () => {
  const i18n = rosetta()
  return {
    ...i18n,
    __t: i18n.t,
    t: createNamespace(i18n.t),
  }
}

export const I18nContext = createContext<Rosetta2>(createRosetta())

const margeNamespace = (namespaceA?: Namespace, namespaceB?: Namespace) => {
  return [...castTrulyArray(namespaceA), ...castTrulyArray(namespaceB)]
}

const addNamespace = (i18n: Rosetta2, namespace?: Namespace) => {
  return margeNamespace(i18n.t[NAMESPACE_T_SYM], namespace)
}

const getSubI18n = (i18n?: Rosetta2, namespace?: Namespace) => {
  if (i18n) {
    return {
      ...i18n,
      t: createNamespace(i18n.__t, addNamespace(i18n, namespace)),
    }
  }

  return createRosetta()
}

const getFullName = (namespace: Array<string | number>, name: Array<string | number> | string | number) => {
  if (Array.isArray(name)) {
    return [...namespace, ...name]
  }

  return [...namespace, name].join('.')
}

export const withI18n = (message: MessageMap) =>
  (func?: GetServerSideProps): GetServerSideProps =>
    async (context) => {
      const result: any = await getServerSideProps(context, func)
      const language = getLanguage()

      const myMessage = await getMessage(language, message)

      Object.assign(result.props, {
        [I18N_NAME]: {
          language,
          message: myMessage,
        },
      })

      return result
    }

export const withPageI18n = (Page) => (props) => {
  const {language, message} = getI18nProp(props)
  const i18n = createRosetta()
  if (message && language) {
    i18n.locale(language)
    i18n.set(language, message)
  }
  return (
    h(I18nContext.Provider, {value: i18n},
      h(Page, {...props}),
    )
  )
}

export const withSubPageI18n = (namespace: Namespace) => (Component: any) => (props) => {
  const i18n = useI18n(namespace)

  return (
    h(I18nContext.Provider, {value: i18n},
      h(Component, {...props}),
    )
  )
}

export const useI18n = (namespace?: Array<string | number> | string | number) => {
  const i18n = useContext(I18nContext)

  return useMemo(() => getSubI18n(i18n, namespace), [i18n, namespace])
}
