import {ApolloClient} from '@apollo/client'
import {GetProductsDocument, GetProductsQuery, GetProductsQueryVariables} from 'api'
import {action} from 'mobx'
import {LoadingState} from 'src/store/types'
import {
  createAddItems,
  createApolloQuery,
  createClearItems,
  createGetItem, getStorageValue,
  saveStorageValue,
  subscribeObservable,
  treatRequest,
} from 'src/utils'
import {client} from 'src/apollo'
import {debounce} from 'lodash'

export interface Product {
  availableCoupon?: boolean
  coverImage?: string
  id: string
  price: number
  score: number
  title: string
}

export interface ProductsState {
  getProduct: (productID: string) => Product
  offset: number
  products: Map<string, Product>
  state: LoadingState
  take: number
  timestamp: number | null
}

const DEFAULT_SAVE_WAIT = 250

const getStorage = getStorageValue('session')('products')
const saveStorage = saveStorageValue('session')('products')

const saveProducts = debounce((state: ProductsState) => {
  const {products, ...rest} = state
  saveStorage({
    ...rest,
    products: [...products.entries()],
  })
}, DEFAULT_SAVE_WAIT)

export const defaultProduct: Partial<Product> = {availableCoupon: true}

export const createProducts = <TCacheShape>(client: ApolloClient<TCacheShape>) => {

  const state = subscribeObservable<ProductsState>({
    get getProduct() {
      return createGetItem(state.products)
    },
    offset: 0,
    products: new Map<string, Product>(),
    state: 'idle',
    take: 5,
    timestamp: null,
  })({
    changed(state) {
      saveProducts(state)
    },
    deepKeys: ['products'],
    init(state) {
      const {products} = getStorage()

      if (Array.isArray(products)) {
        products.forEach(([key, item]) => {
          state.products.set(key, item)
        })
      }
    },
  })

  const addProducts = action(createAddItems(state.products)())

  const updatePagination = action(({offset, timestamp}: {offset?: number, timestamp?: number}) => {
    offset && (state.offset = offset)
    timestamp && (state.timestamp = timestamp)
  })

  const updateState = action((value: LoadingState) => (state.state = value))

  const clearProducts = action(createClearItems(state.products))

  const createRequestProducts =
    createApolloQuery<GetProductsQueryVariables, GetProductsQuery>(GetProductsDocument)

  const requestGetProducts = action(treatRequest(createRequestProducts(client), {
    done: ({data}) => {

      const {products} = data

      addProducts(products?.list.map(({availableCoupon: _availableCoupon, ...rest}) => {
        const availableCoupon = _availableCoupon === null ? true : _availableCoupon
        return {
          ...rest,
          availableCoupon,
        }
      }))

      updatePagination({offset: products.offset + products?.take})

      updateState('idle')
    },
    error: () => updateState('error'),
    start: ({timestamp, ...rest}) => {

      const newTimestamp = timestamp || state.timestamp || new Date().getTime()

      updateState('loading')
      updatePagination({timestamp: newTimestamp})

      return [{
        offset: state.offset,
        take: state.take,
        ...rest,
        timestamp: newTimestamp,
      }]
    },
  }))

  return {
    addProducts,
    clearProducts,
    requestGetProducts,
    state,
    updatePagination,
  }
}

export const products = createProducts(client)

export const useProducts = () => {
  return products
}
