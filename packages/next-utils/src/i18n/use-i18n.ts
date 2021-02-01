import {useContext, useMemo} from 'react'
import {NAMESPACE_TRANSLATOR_SYM} from './constants'
import {createNamespace, margeNamespace, Namespace} from './namespace'
import {createRosetta, I18nContext, Rosetta2} from './context'

export const addNamespace = (i18n: Rosetta2, namespace?: Namespace) => {
  return margeNamespace(i18n.t[NAMESPACE_TRANSLATOR_SYM], namespace)
}

const getSubI18n = (i18n?: Rosetta2, namespace?: Namespace): Rosetta2 => {
  if (i18n) {
    return {
      ...i18n,
      t: createNamespace(i18n.__t, addNamespace(i18n, namespace)),
    }
  }

  return createRosetta()
}

export const useI18n = (namespace?: Array<string | number> | string | number): Rosetta2 => {
  const i18n = useContext(I18nContext)

  return useMemo(() => getSubI18n(i18n, namespace), [i18n, namespace])
}
