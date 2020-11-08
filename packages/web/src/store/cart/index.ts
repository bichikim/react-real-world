import {observable} from 'mobx'
import {amount, DiscountLogic, rate} from 'src/store/cart/discount-logics'
import {defaults} from 'lodash-es'

const discountLogics = {amount, rate}

interface Item {
  /**
   * how may items
   * @default 1
   */
  amount?: number
  /**
   * whether the coupon can be used on the item
   * @default true
   */
  coupon?: boolean
  /**
   * @default 0
   */
  price?: number
  /**
   * whether to buy
   */
  purchase?: boolean
}


interface Coupons {
  /**
   * how much to discount
   * @default 0
   */
  amount?: number
  title: string
  type: 'amount' | 'rate'
}

interface State {
  coupons: Coupons[]
  list: Item[]
  readonly totalPrice: number
}

const itemDefault = {amount: 1, coupon: true, price: 0}

const getTotalPrice = (list: Item[]) => {
  let couponTotalPrice = 0
  let totalPrice = 0

  list.forEach((item) => {
    const {amount, price, coupon} = defaults(item, itemDefault)
    const total = price * amount
    totalPrice += total
    if (coupon) {
      couponTotalPrice += total
    }
  })

  return {
    couponTotalPrice,
    totalPrice,
  }
}

const getDiscountLogics = (coupons: Coupons[]): DiscountLogic[] => {
  return coupons.map((coupon) => {
    const {type, amount = 0} = coupon
    return discountLogics[type](amount)
  })
}

const executeCouponLogics = (value: number, logics: DiscountLogic[]): number => {
  let price = value
  logics.forEach((logic) => {
    price = logic(price)
  })
  return price
}

export const state = observable<State>({
  coupons: [],
  list: [],
  get totalPrice() {
    const {totalPrice, couponTotalPrice} = getTotalPrice(state.list)
    const couponLogics = getDiscountLogics(state.coupons)
    // 할인 대상 목록이 아닌 아이탬의 총 가격
    const nonDiscountedPrice = totalPrice - couponTotalPrice
    // 할인 대상 목록 아이챔 총 가격의 할인된 가격
    const discountedPrice = executeCouponLogics(couponTotalPrice, couponLogics)

    return discountedPrice + nonDiscountedPrice
  },
})

export const createMaxAddList = (max: number) => <S = any>(list: S[]) => (item: S) => {
  if (list.length < max) {
    return [...list, item]
  }
  return [...list]
}

