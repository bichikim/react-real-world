import {AnyObject, objectAsyncMap} from 'src/utils'
import {GetServerSidePropsContext} from 'next'
import {createWithServerSideProps} from 'src/with-server-side-page-props'
import {DEFAULT_LANGUAGE, I18N_NAME, MULTI_SYM} from './constants'

export interface MessageMap {
  [key: string]: () => Promise<any> | any
}

const safeEsModule = (module) => module.default ?? module

/**
 * todo it should use context
 * @param context
 */
export const getLanguage = (context: GetServerSidePropsContext) => {
  return context?.locale ?? DEFAULT_LANGUAGE
}

const getMessage = async (language, message: MessageMap) => {
  const messageLoader = message[language]

  const myMessage = messageLoader ? await messageLoader() : {}

  const noEsMessage = safeEsModule(myMessage)

  if (Array.isArray(noEsMessage)) {
    const newMessage = {}
    noEsMessage.forEach((result) => {
      const myResult = safeEsModule(result)
      if (typeof myResult === 'object') {
        Object.assign(newMessage, myResult)
      }
    })
    return newMessage
  }

  return {...noEsMessage}
}

/**
 * withI18n -> withServerSideI18n
 */
export const withServerSideI18n = createWithServerSideProps<AnyObject, MessageMap>(
  async (context, message) => {
    const language = getLanguage(context)

    const myMessage = await getMessage(language, message)

    return {
      props: {
        [I18N_NAME]: {
          language,
          message: myMessage,
        },
      },
    }
  },
)

export const multiMessage = (list: Record<string, Promise<any>>) => {
  const caller = async () => {
    return objectAsyncMap(list, async (value) => {
      return safeEsModule(await value)
    })
  }

  Object.assign(caller, {
    [MULTI_SYM]: true,
  })

  return caller
}
