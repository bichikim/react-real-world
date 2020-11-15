import {defaults} from 'lodash-es'
import {CartItem} from 'src/store/cart-list/index'
import {defaultProduct, Product} from 'src/store/products'
import {amount, DiscountLogic, rate} from './discount-logics'

const _discountLogics = {amount, rate}

const defaultItem: Partial<CartItem> = {amount: 1, purchase: false}

const getProductId = (item: CartItem) => item.productID

export const getTotalPrice = (cartList: Map<string, CartItem>, products: Map<string, Product>) => {
  let couponTotalPrice = 0
  let totalPrice = 0

  cartList.forEach((item) => {
    const myItem = defaults(item, defaultItem)
    const {amount} = myItem
    const {price, availableCoupon} = defaults(products.get(getProductId(myItem)), defaultProduct)

    const total = price * amount
    totalPrice += total
    if (availableCoupon) {
      couponTotalPrice += total
    }
  })

  return {
    couponTotalPrice,
    totalPrice,
  }
}

export interface DiscountInfo {
  amount?: number
  type: string
}

export const getDiscountLogics = (
  coupons: DiscountInfo[],
  discountLogics: typeof _discountLogics = _discountLogics,
): DiscountLogic[] => {
  return coupons.map((coupon) => {
    if (!coupon) {
      return (value) => (value)
    }

    const {type, amount = 0} = coupon
    return discountLogics[type](amount)
  }).filter(Boolean)
}

export const calculateTotalPrice = (
  carts: Map<string, CartItem>,
  products: Map<string, Product>,
  coupons: DiscountInfo[],
) => {
  const {totalPrice, couponTotalPrice} = getTotalPrice(carts, products)

  const couponLogics = getDiscountLogics(coupons)

  // 할인 대상 목록이 아닌 아이탬의 총 가격
  const nonDiscountedPrice = totalPrice - couponTotalPrice

  // 할인 대상 목록 아이챔 총 가격의 할인된 가격
  const discountedPrice = couponLogics.reduce((price, execute) => (execute(price)), couponTotalPrice)

  return discountedPrice + nonDiscountedPrice
}
