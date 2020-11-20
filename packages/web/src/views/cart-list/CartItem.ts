import {FC, createElement as h, useCallback} from 'react'
import {Box} from 'src/components/Box'
import {Img} from 'src/components/Img'
import {CartItem as CartITem_} from 'src/store/cart-list'
import {Product} from 'src/store/products'

interface CheckBoxProps {
  onClick?: () => any
  value?: boolean
}

const CheckBox: FC<CheckBoxProps> = (props) => {
  const {value, onClick} = props

  return (
    h(Box, {as: 'input', checked: value, onClick, position: 'relative', size: '20px', type: 'checkbox'})
  )
}

const Coupon: FC = () => {
  return (
    h(Box, {fontSize: 'md', position: 'relative'}, '🎫')
  )
}

const Amount: FC = (props) => {
  return (
    h(Box, {fontSize: 'md', p: 10, position: 'relative'}, props.children)
  )
}

const Title: FC = (props) => {
  return (
    h(Box, {position: 'relative'},
      h(Box, {bg: 'black', left: 0, opacity: 0.7, position: 'absolute', right: 0, size: '100%'}),
      h(Box, {color: 'white', fontSize: 'md', p: 10, position: 'relative'}, props.children),
    )
  )
}

const Price: FC = (props) => {
  return (
    h(Box, {fontSize: 'lg', p: 10, position: 'relative'}, props.children)
  )
}

interface ImageProps {
  src?: string
}

const Image: FC<ImageProps> = (props) => {
  const {src} = props

  return (
    h(Box, {left: 0, position: 'absolute', size: '100%', top: 0},
      h(Box, {bg: 'white', left: 0, opacity: 0.7, position: 'absolute', size: '100%', top: 0}),
      h(Img, {src, width: '100%'}),
    )
  )
}

interface UpDownProps {
  onChangeAmount?: (amount: number) => any
}

const UpDown: FC<UpDownProps> = (props) => {
  const {onChangeAmount} = props
  const handleChangeAmount = useCallback((amount) => () => {
    onChangeAmount?.(amount)
  }, [onChangeAmount])

  return (
    h(Box, {height: 40, position: 'relative', width: 20},
      h(Box, {
        bg: 'forestGreen',
        cursor: 'pointer',
        height: '50%',
        onClick: handleChangeAmount(1),
        userSelect: 'none',
      }, '🔺'),
      h(Box, {bg: 'gray', cursor: 'pointer', height: '50%', onClick: handleChangeAmount(-1)}, '🔻'),
    )
  )
}

export interface CartItemProps extends Partial<CartITem_>, Partial<Product> {
  onChangeAmount?: (amount: number) => any
  onChangePurchase?: (value: boolean) => any
}

export const CartItem: FC<CartItemProps> = (props) => {
  const {title, availableCoupon, purchase, coverImage, amount, price, onChangeAmount, onChangePurchase} = props

  const handleChangeAmount = useCallback((_amount) => {
    const newMount = amount + _amount

    if (newMount > 0) {
      onChangeAmount?.(_amount)
    }

  }, [onChangeAmount, amount])

  const HandleChangePurchase = useCallback(() => {
    onChangePurchase?.(!purchase)
  }, [purchase, onChangePurchase])

  return (
    h(Box, {overflow: 'hidden', position: 'relative', width: '100%'},
      h(Image, {src: coverImage}),
      h(Title, null, title),
      h(Box, {alignItems: 'center', display: 'flex', p: 10},
        h(CheckBox, {onClick: HandleChangePurchase, value: purchase}),
        h(Box, {fontSize: 'md', p: '5px', position: 'relative'}, 'purchase'),
        h(Box, {flexGrow: 1}),
        availableCoupon && h(Coupon),
        h(Price, null, price),
        h(Box, {position: 'relative'}, 'x'),
        h(Amount, null, amount),
        h(UpDown, {onChangeAmount: handleChangeAmount}),
      ),
    )
  )
}

