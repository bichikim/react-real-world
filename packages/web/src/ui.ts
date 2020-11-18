import {Interpolation} from '@emotion/serialize'
import {CacheProvider, css, EmotionCache, Global, ThemeProvider} from '@emotion/react'
import {UIDReset} from 'react-uid'
import createCache from '@emotion/cache'
import {FC, createElement as h, useMemo} from 'react'
import {defaultTheme} from './theme'

export interface UIProps {
  nonce: string
  theme?: any
}

const system: Interpolation<any> = {
  '*': {
    backgroundColor: 'transparent',
    border: 0,
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

export const UI: FC<UIProps> = (props) => {
  const {theme = defaultTheme, children, nonce} = props

  const cache: EmotionCache = useMemo(() => (createCache({
    key: 'css',
    nonce,
  })), [nonce])

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
