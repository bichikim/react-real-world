import {action} from 'mobx'
import {getStorageValue, saveStorageValue, subscribeObservable} from 'src/utils'
import {
  createGetItem,
  createGetItemByIndex,
  createMaxAddItem,
  createMaxAddItems,
  createRemoveItem,
  IndexOptions,
} from 'src/utils/id-list'
import {v1 as uuid} from 'uuid'
import {debounce} from 'lodash'
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
  getCartItem: (id: string) => CartItem | undefined
  getCartItemByProductID: (productID: string) => CartItem
  productIDIndexList: Map<any, string>
  readonly totalCount: number
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

const saveStorage = saveStorageValue('session')('cart-list')
const getStorage = getStorageValue('session')('cart-list')

const DEFAULT_SAVE_WAIT = 250

const saveCartList = debounce((state: CartsState) => {

  const {cartList, productIDIndexList, couponID} = state
  saveStorage({
    cartList: [...cartList.entries()],
    couponID,
    productIDIndexList: [...productIDIndexList.entries()],
  })
}, DEFAULT_SAVE_WAIT)

export const createCartList = (options: UseCartOptions) => {
  const {max = DEFAULT_MAX, products, user} = options

  const state = subscribeObservable<CartsState>({
    cartList: new Map<string, CartItem>(),
    couponID: null,
    get getCartItem() {
      return createGetItem(state.cartList)
    },
    get getCartItemByProductID() {
      return createGetItemByIndex<CartItem>(state.cartList, {
        indexList: this.productIDIndexList,
        name: 'productID',
      })
    },
    productIDIndexList: new Map<any, string>(),
    get totalCount() {
      return state.cartList.size
    },
    get totalPrice() {
      return calculateTotalPrice(state.cartList, products.state.products, [user.getCoupon(state.couponID)])
    },
  })({
    changed: (state) => {
      saveCartList(state)
    },
    deepKeys: ['cartList', 'productIDIndexList'],
    init(state) {
      const {cartList, productIDIndexList, couponID} = getStorage()
      setTimeout(() => {

        state.couponID = couponID

        if (Array.isArray(cartList)) {
          cartList.forEach(([id, item]) => {
            state.cartList.set(id, item)
          })
        }

        if (Array.isArray(productIDIndexList)) {
          productIDIndexList.forEach(([id, item]) => {
            state.productIDIndexList.set(id, item)
          })
        }
      }, DEFAULT_SAVE_WAIT)

    },
  })

  const indexOptions: IndexOptions = {
    indexList: state.productIDIndexList,
    name: 'productID',
  }

  const addCoupon = action((couponID: string, value: boolean) => {
    if (state.couponID === couponID && !value) {
      state.couponID = null
      return
    }

    state.couponID = couponID
  })

  const addCartItem = action(createMaxAddItem(max)(state.cartList, indexOptions)())

  const updateCartAmount = action((cartID: string, amount: number = 1) => {
    const cartItem = state.getCartItem(cartID)

    if (!cartItem) {
      return
    }

    const newAmount = cartItem.amount + amount

    if (newAmount <= 0) {
      removeCartItem(cartItem.id)
      return
    }

    addCartItem({...cartItem, amount: newAmount})
  })

  const updateCartPurchase = action((cartID: string, value: boolean) => {

    const cartItem = state.getCartItem(cartID)

    if (!cartItem) {
      return
    }

    addCartItem({...cartItem, purchase: value})
  })

  const putProductInCart = action((productID: string, amount: number = 1) => {

    const cartItem = state.getCartItemByProductID(productID)

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

    updateCartAmount(cartItem.id, amount)
  })

  const removeCartItemByProductID = action((productID) => {
    const cartItem = state.getCartItemByProductID(productID)

    if (cartItem) {
      removeCartItem(cartItem.id)
    }
  })

  const putProductsInCart = action((products: AmountInfo[]) => {
    products.forEach(({amount, productID}) => putProductInCart(productID, amount))
  })

  const removeCartItem = action(createRemoveItem(state.cartList, indexOptions))

  const addCartList = action(createMaxAddItems(max)(state.cartList, indexOptions))

  return {
    addCartItem,
    addCartList,
    addCoupon,
    putProductInCart,
    putProductsInCart,
    removeCartItem,
    removeCartItemByProductID,
    state,
    updateCartAmount,
    updateCartPurchase,
  }
}

export const cartList = createCartList({
  products, user,
})

export const useCartList = () => {
  return cartList
}
