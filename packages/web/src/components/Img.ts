import {Box} from './Box'
import {FC, createElement as h} from 'react'
import {useTheme} from '@emotion/react'

export interface ImgProps {
  src?: string
}

export const Img: FC<ImgProps> = (props) => {
  const {src, ...rest} = props

  const theme = useTheme()

  console.log(theme)

  return (
    h(Box, {...rest, as: 'img', src},
    )
  )
}
