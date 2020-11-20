import {FC, createElement as h, useCallback} from 'react'
import {Box} from 'src/components/Box'
import {CartItem, CartItemProps} from './CartItem'

export interface CartItemListProps {
  list: Array<[string, CartItemProps]>
  onChangeAmount?: (id: string, amount?: number) => any
  onChangePurchase?: (id: string, value: boolean) => any
}

export const CartItemList: FC<CartItemListProps> = (props) => {
  const {list, onChangeAmount, onChangePurchase} = props

  const handleChangeAmount = useCallback((id: string) => (amount?: number) => {
    onChangeAmount?.(id, amount)
  }, [onChangeAmount])

  const HandleChangePurchase = useCallback((id: string) => (value: boolean) => {
    onChangePurchase?.(id, value)
  }, [onChangePurchase])

  return (
    h(Box, {position: 'relative'},
      list.map(([key, item]) => {
        const {title, amount, coverImage, price, availableCoupon, purchase} = item
        return (
          h(CartItem, {
            amount,
            availableCoupon,
            coverImage,
            key,
            onChangeAmount: handleChangeAmount(key),
            onChangePurchase: HandleChangePurchase(key),
            price,
            purchase,
            title,
          })
        )
      }),
    )
  )
}
