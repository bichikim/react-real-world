import {observer} from 'mobx-react-lite'
import {useRouter} from 'next/router'
import {FC, createElement as h, useCallback} from 'react'
import {Box} from 'src/components/Box'
import {useOnce} from 'src/hooks'
import {useCartList} from 'src/store/cart-list'
import {useProducts} from 'src/store/products'
import {Coupon, useUser} from 'src/store/user'
import {CartItemProps} from 'src/views/cart-list/CartItem'
import {CartItemList} from 'src/views/cart-list/CartItemList'
import {CouponList} from 'src/views/cart-list/CouponList'

export interface CartListPageProps {
  coupons: Coupon[]
}

export const CartListPage: FC<CartListPageProps> = observer((props) => {
  const {push} = useRouter()

  const goProducts = useCallback(() => {
    return push('/products').then(() => {
      window.scrollTo(0, 0)
    })
  }, [push])

  const {
    state: {cartList: _cartList, totalPrice, couponID},
    updateCartAmount,
    updateCartPurchase,
    addCoupon,
  } = useCartList()
  const {state: {getProduct}} = useProducts()
  const {state: {coupons}, addCoupons} = useUser()

  useOnce(() => {
    const {coupons} = props
    addCoupons(coupons)
  })

  const cartList: Array<[string, CartItemProps]> = [..._cartList.entries()].map(([key, item]) => {
    return [key, {
      ...getProduct(item.productID),
      ...item,
    }]
  })

  const couponList = [...coupons.entries()]

  return h(Box, {position: 'relative'},
    cartList.length === 0 && h(Box, {
      display: 'flex',
      fontSize: 'xl',
      justifyContent: 'center',
      py: 100,
    },
    h(Box, {cursor: 'pointer', onClick: goProducts}, 'No Cart Items Go Products ✨'),
    ),
    h(CartItemList, {list: cartList, onChangeAmount: updateCartAmount, onChangePurchase: updateCartPurchase}),

    h(CouponList, {list: couponList, onChangeSelect: addCoupon, selectedCouponID: couponID}),

    h(Box, {alignItems: 'center', bg: 'black', display: 'flex', p: 10},
      h(Box, {color: 'white', flexGrow: 1, fontSize: 'md'}, 'Total Price'),
      h(Box, {bg: 'forestGreen', color: 'white', fontSize: 'lg', p: '5px'}, totalPrice),
    ),

    h(Box, {display: 'flex', flexDirection: 'row-reverse'},
      h(Box, {
        bg: 'forestGreen',
        color: 'white',
        cursor: 'pointer',
        fontSize: 'xl',
        p: 20,
        userSelect: 'none',
      }, 'Purchase Now'),
    ),
  )
})
