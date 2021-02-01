import {createElement as h} from 'react'
import {createRosetta, I18nContext} from './context'
import {Namespace} from './namespace'
import {useI18n} from './use-i18n'
import {I18N_NAME} from './constants'

export const getI18nProp = (props) => {
  const {message, language} = props[I18N_NAME] || {}
  return {
    language,
    message,
  }
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
