import {createContext, useContext, useMemo} from 'react'
import {IS_SSR} from 'src/utils'

export const pagePropsContext = createContext<Record<string, any>>({})

let _pageProps

const useClientPageProps = () => {
  return useMemo(() => {
    const rawJson = document.querySelector('#__NEXT_DATA__')

    if (_pageProps) {
      return _pageProps
    }

    try {
      const result = JSON.parse(rawJson?.innerHTML)
      _pageProps = result?.props?.pageProps ?? {}

      return _pageProps
    } catch {
      return {}
    }
  }, [])
}

export const usePageProps = () => {

  if (IS_SSR) {
    return useContext(pagePropsContext)
  }

  return useClientPageProps()
}
