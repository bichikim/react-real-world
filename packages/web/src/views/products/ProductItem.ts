/* eslint-disable no-magic-numbers */
import {FC, createElement as h, useCallback} from 'react'
import {Box} from 'src/components/Box'
import {Product} from 'src/store/products'

export interface ProductItemProps extends Product {
  onAddCart?: (id: string) => any
  onChange?: (value: boolean) => any
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
    h(Box, {
      as: 'img',
      left: '50%',
      position: 'absolute',
      src,
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: ['auto', '100%'],
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

const CheckBox: FC<{value: boolean}> = ({value}) => {

  return (
    h(Box, {
      as: 'input',
      checked: value,
      height: 20,
      m: 10,
      position: 'relative',
      type: 'checkbox',
      width: 20,
    })
  )
}

const AddCart: FC<{coupon: boolean, onClick: () => any}> = ({onClick, coupon}) => {

  const text = coupon ? '🎫 Add Cart' : 'Add Cart'

  return (
    h(Box, {
      as: 'button',
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
    }, text))
  )
}

export const ProductItem: FC<ProductItemProps> = (props) => {
  const {title, availableCoupon, price, coverImage, value = false, onChange, onAddCart, id} = props

  const handleClick = useCallback(() => {
    onChange && onChange(!value)
  }, [value, onChange])

  const handleAddCart = useCallback(() => {
    onAddCart && onAddCart(id)
  }, [onAddCart, id])

  return (
    h(ProductContainer, {onClick: handleClick},
      h(CoverImage, {src: coverImage}),
      h(CheckBox, {value}),
      h(InfoContainer, null,
        h(Price, null, price),
        h(AddCart, {coupon: availableCoupon, onClick: handleAddCart}),
        h(Title, null, title),
      ),

    )
  )
}
