import {Interpolation} from '@emotion/serialize'
import {CacheProvider, css, EmotionCache, Global, ThemeProvider} from '@emotion/react'
import {UIDReset} from 'react-uid'
import createCache from '@emotion/cache'
import {FC, createElement as h, useMemo} from 'react'
import {usePageProps} from 'src/hooks'
import {defaultTheme} from './theme'

export interface UIProps {
  nonce?: string
  theme?: any
}

const system: Interpolation<any> = {
  '*': {
    backgroundColor: 'transparent',
    border: 0,
    boxSizing: 'border-box',
    margin: 0,
    outline: '0 !important',
    padding: 0,
  },
}

const styles = css(system)

export const GlobalStyle = () => {
  return (
    h(Global, {styles})
  )
}

const useCache = (nonce) => useMemo(() => (createCache({
  key: 'css',
  nonce,
})), [nonce])

export const UIDocument: FC<UIProps> = (props) => {
  const {children, nonce} = props

  const cache: EmotionCache = useCache(nonce)

  return (
    h(CacheProvider, {value: cache},
      children,
    )
  )
}

export const UI: FC<UIProps> = (props) => {
  const {theme = defaultTheme, children, nonce: _nonce} = props

  const pageProps = usePageProps()

  const nonce = pageProps?.csp?.nonce ?? _nonce

  const cache: EmotionCache = useCache(nonce)

  return (
    h(CacheProvider, {value: cache},
      h(GlobalStyle),
      h(ThemeProvider, {theme},
        h(UIDReset, null,
          children,
        ),
      ),
    )
  )
}
