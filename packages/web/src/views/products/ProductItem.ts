/* eslint-disable no-magic-numbers */
import {FC, createElement as h, useCallback} from 'react'
import {Box} from 'src/components/Box'
import {Product} from 'src/store/products'
import {Img} from 'src/components/Img'

export interface ProductItemProps extends Product {
  hasCart?: boolean
  onChange?: (value: boolean) => any
  onChangeCart?: (id: string, amount?: number) => any
  value?: boolean
}

const ProductContainer: FC<{onClick: () => any}> = ({children, onClick}) => {
  return (
    h(Box, {
      bg: 'black',
      height: [200, 300, 400],
      onClick,
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
    }, children)
  )
}

const CoverImage: FC<{src: string}> = ({src}) => {
  return (
    h(Box, {
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
    },
    h(Img, {
      height: 'auto',
      src,
      width: '100%',
    }),
    )
  )
}

const InfoContainer: FC = ({children}) => {
  return (
    h(Box, {
      alignItems: 'flex-end',
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      right: 0,
    }, children)
  )
}

const Title: FC = ({children}) => {
  return (
    h(Box, {
      position: 'relative',
    },
    h(Box, {
      bg: 'black',
      height: '100%',
      left: 0,
      opacity: 0.5,
      position: 'absolute',
      top: 0,
      width: '100%',
    }),
    h(Box, {
      color: 'white',
      fontSize: ['20px', '25px'],
      p: 10,
      position: 'relative',
    }, children),
    )
  )
}

const Price: FC = ({children}) => {
  return (
    h(Box, {
      position: 'relative',
    },
    h(Box, {
      bg: 'forestGreen',
      height: '100%',
      left: 0,
      opacity: 0.75,
      position: 'absolute',
      top: 0,
      width: '100%',
    }),
    h(Box, {
      color: 'white',
      fontSize: ['15px', '20px'],
      p: 10,
      position: 'relative',
    }, children),
    )
  )
}

interface AddCartProps {
  coupon?: boolean
  hasCart?: boolean
  onClick?: () => any
}

const AddCart: FC<AddCartProps> = ({onClick, coupon, hasCart}) => {

  const text = hasCart ? 'Remove Cart' : 'Add Cart'

  const couponText = coupon ? '🎫 ' : ''

  return (
    h(Box, {
      as: 'button',
      cursor: 'pointer',
      onClick,
      position: 'relative',
    },
    h(Box, {
      bg: 'forestGreen',
      height: '100%',
      left: 0,
      opacity: 0.75,
      position: 'absolute',
      top: 0,
      width: '100%',
    }),
    h(Box, {
      color: 'white',
      fontSize: ['15px', '20px'],
      p: 10,
      position: 'relative',
    }, couponText, text))
  )
}

export const ProductItem: FC<ProductItemProps> = (props) => {
  const {title, availableCoupon, price, coverImage, onChangeCart, id, hasCart} = props

  const handleAddCart = useCallback(() => {
    onChangeCart?.(id, hasCart ? -10000 : 1)
  }, [onChangeCart, id, hasCart])

  return (
    h(ProductContainer, null,
      h(CoverImage, {src: coverImage}),
      h(InfoContainer, null,
        h(Price, null, price),
        h(AddCart, {coupon: availableCoupon, hasCart, onClick: handleAddCart}),
        h(Title, null, title),
      ),

    )
  )
}
