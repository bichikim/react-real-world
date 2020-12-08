import {useRouter} from 'next/router'
import {FC, createElement as h, useCallback} from 'react'
import {Box} from 'src/components/Box'

interface HeaderProps {
  location?: string
  onGoCart?: () => any
  onGoHome?: () => any
  onGoProducts?: () => any
  totalCount: number
}

const Header: FC<HeaderProps> = (props) => {
  const {location} = props
  return (
    h(Box, {
      alignItems: 'center',
      bg: 'white',
      display: 'flex',
      height: 50,
      p: 10,
      position: 'sticky',
      top: 0,
      width: '100%',
      zIndex: 10,
    },
    h(Box, {cursor: 'pointer', flexGrow: 1, fontSize: 'md', onClick: props.onGoHome}, 'Shop'),
    h(Box, {
      cursor: 'pointer',
      fontSize: 'md',
      onClick: props.onGoProducts,
      pr: 10,
      textDecoration: location === '/products' ? 'underline' : 'none',
    }, '🎁'),
    h(Box, {
      cursor: 'pointer',
      fontSize: 'md',
      onClick: props.onGoCart,
      textDecoration: location === '/cart-list' ? 'underline' : 'none',
    }, `🛒${props.totalCount}`),
    )
  )
}

const Main: FC = (props) => {
  return (
    h(Box, null, props.children)
  )
}

export const DefaultLayout: FC = (props) => {
  const {push, pathname} = useRouter()

  const handleGoHome = useCallback(() => {
    return push('/').then(() => {
      window.scrollTo(0, 0)
    })
  }, [push])

  const handleGoCart = useCallback(() => {
    return push('/cart-list').then(() => {
      window.scrollTo(0, 0)
    })
  }, [push])

  const handleGoProducts = useCallback(() => {
    return push('/products').then(() => {
      window.scrollTo(0, 0)
    })
  }, [push])

  return (
    h(Box, {maxWidth: 1024, mx: 'auto'},
      h(Header, {
        location: pathname,
        onGoCart: handleGoCart,
        onGoHome: handleGoHome,
        onGoProducts: handleGoProducts,
        totalCount: 0,
      }),
      h(Main, null, props.children),
    )
  )
}
