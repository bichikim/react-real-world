import {FC, createElement as h, useCallback} from 'react'
import {EmptyObject} from 'src/types'
import {Box} from 'src/components/Box'
import {useRouter} from 'next/router'

export const MainPage:FC<EmptyObject> = () => {

  const {push} = useRouter()

  const goProducts = useCallback(() => push('/products').then(() => {
    window.scrollTo(0, 0)
  }), [push])

  return h(Box, {cursor: 'pointer', onClick: goProducts}, 'Go Products')
}

