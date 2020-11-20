import {FC, createElement as h, useMemo} from 'react'
import {Box, BoxProps} from './Box'

export interface ImgProps extends BoxProps {
  sizeList?: string[]
  src?: string
}

const DEFAULT_SIZE_LIST = ['375', '750', '960', '1440', '2048']

export const Img: FC<ImgProps> = (props) => {
  const {src, sizeList = DEFAULT_SIZE_LIST, ...rest} = props

  const srcSet = useMemo(() => {
    return sizeList.map((size) => {
      return `${src}/${size}xauto ${size}w`
    }).join(', ')
  }, [sizeList, src])

  return (
    h(Box, {...rest, as: 'img', src, srcSet},
    )
  )
}
