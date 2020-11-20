import {useRouter} from 'next/router'
import {FC, createElement as h, useCallback} from 'react'
import {Box} from 'src/components/Box'
import {EmptyObject} from 'src/types'

export const MainPage: FC<EmptyObject> = () => {
  const {push} = useRouter()

  const goProducts = useCallback(() => {
    return push('/products').then(() => {
      window.scrollTo(0, 0)
    })
  }, [push])

  return h(Box, {
    alignItems: 'center',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    width: '100%',
  }, h(Box, {
    cursor: 'pointer',
    fontSize: 'xl',
    onClick: goProducts,
  }, 'Go Products ✨',
  ))
}

