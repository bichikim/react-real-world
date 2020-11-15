import {action, observable} from 'mobx'
import {
  createGetItem,
  createGetItemByIndex,
  createMaxAddItem,
  createMaxAddItems,
  createRemoveItem,
  IndexOptions,
} from 'src/utils/id-list'
import {v1 as uuid} from 'uuid'
import {useDeepMemo} from 'src/hooks'
import {createProducts, products} from '../products'
import {createUser, user} from '../user'
import {calculateTotalPrice} from './calulate-total-price'

export interface CartItem {
  /**
   * how may items
   * @default 1
   */
  amount?: number
  id: string
  productID: string
  /**
   * whether to buy
   */
  purchase?: boolean
}

export interface CartsState {
  cartList: Map<string, CartItem>
  couponID: string | null
  productIDIndexList: Map<any, string>
  readonly totalPrice: number
}

interface UseCartOptions {
  /**
   * max cart items
   * @default 3
   */
  max?: number
  products: ReturnType<typeof createProducts>
  user: ReturnType<typeof createUser>
}

const DEFAULT_MAX = 3

interface AmountInfo {
  amount?: number
  productID: string
}

export const createCartList = (options: UseCartOptions) => {
  const {max = DEFAULT_MAX, products, user} = options

  const state = observable<CartsState>({
    cartList: new Map<string, CartItem>(),
    couponID: null,
    productIDIndexList: new Map<any, string>(),
    get totalPrice() {
      return calculateTotalPrice(state.cartList, products.state.products, [user.getCoupon(state.couponID)])
    },
  })

  const indexOptions: IndexOptions = {
    indexList: state.productIDIndexList,
    name: 'productID',
  }

  const addCoupon = action((coupon: string) => {
    state.couponID = coupon
  })

  const addCartItem = action(createMaxAddItem(max)(state.cartList, indexOptions)())

  const getCartItemByProductID = action(createGetItemByIndex(state.cartList, indexOptions))

  const putProductInCart = action((productID: string, amount: number = 1) => {
    const cartItem = getCartItemByProductID(productID)

    if (!cartItem && amount > 0) {
      addCartItem({
        amount,
        id: uuid(),
        productID,
        purchase: false,
      })
      return
    } else if (!cartItem) {
      return
    }

    const newAmount = cartItem.amount + amount

    if (newAmount <= 0) {
      removeCartItem(cartItem.id)
      return
    }

    addCartItem({...cartItem, amount: newAmount})
  })

  const removeCartItemByProductID = action((productID) => {
    const cartItem = getCartItemByProductID(productID)

    if (cartItem) {
      removeCartItem(cartItem.id)
    }
  })

  const putProductsInCart = action((products: AmountInfo[]) => {
    products.forEach(({amount, productID}) => putProductInCart(productID, amount))
  })

  const removeCartItem = action(createRemoveItem(state.cartList, indexOptions))

  const getCartItem = action(createGetItem(state.cartList))

  const addCartList = action(createMaxAddItems(max)(state.cartList, indexOptions))

  return {
    addCartItem,
    addCartList,
    addCoupon,
    getCartItem,
    getCartItemByProductID,
    putProductInCart,
    putProductsInCart,
    removeCartItem,
    removeCartItemByProductID,
    state,
  }
}

export const useCartList = (options?: UseCartOptions) => useDeepMemo(() => createCartList(options), options)

export const cartList = createCartList({
  products, user,
})
