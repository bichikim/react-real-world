import {observer} from 'mobx-react-lite'
import {useRouter} from 'next/router'
import {FC, createElement as h, useCallback} from 'react'
import {Box} from 'src/components/Box'
import {useCartList} from 'src/store/cart-list'

interface HeaderProps {
  onGoCart?: () => any
  onGoHome?: () => any
  onGoProducts?: () => any
  totalCount: number
}

const Header: FC<HeaderProps> = (props) => {
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
    h(Box, {cursor: 'pointer', flexGrow: 1, fontSize: 'md', onClick: props.onGoHome}, '101'),
    h(Box, {cursor: 'pointer', fontSize: 'md', onClick: props.onGoProducts, pr: 10}, '🎁'),
    h(Box, {cursor: 'pointer', fontSize: 'md', onClick: props.onGoCart}, `🛒${props.totalCount}`),
    )
  )
}

const Main: FC = (props) => {
  return (
    h(Box, null, props.children)
  )
}

export const DefaultLayout: FC = observer((props) => {
  const {push} = useRouter()

  const {state: {totalCount}} = useCartList()

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
      h(Header, {onGoCart: handleGoCart, onGoHome: handleGoHome, onGoProducts: handleGoProducts, totalCount}),
      h(Main, null, props.children),
    )
  )
})
