import {FC, createElement as h} from 'react'
import {Box} from './Box'
// import {useTheme} from '@emotion/react'

export interface ImgProps {
  src?: string
}

export const Img: FC<ImgProps> = (props) => {
  const {src, ...rest} = props

  // const theme = useTheme()

  return (
    h(Box, {...rest, as: 'img', src},
    )
  )
}
