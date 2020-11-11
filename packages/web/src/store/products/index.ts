import {action, observable} from 'mobx'
import {useMemo} from 'react'
import {createAddItems, createClearItems, createGetItem, memoAction, treatError} from 'src/utils'
import {ApolloClient, useApolloClient} from '@apollo/client'
import {GetProductsDocument} from 'api'
import {LoadingState} from 'src/store/types'

export interface Product {
  availableCoupon?: boolean
  cartID?: string
  coverImage?: string
  id: string
  price: number
  score: number
  title: string
}

export interface ProductsState {
  list: Map<string, Product>
  state: LoadingState
}

export const defaultProduct: Partial<Product> = {availableCoupon: true}

export const products = observable<ProductsState>({
  list: new Map<string, Product>(),
  state: 'idle',
})

interface Pagination {
  offset?: number
  sort?: boolean
  take?: number
}

export const createRequestProducts = (client: ApolloClient<any>) => (pagination: Pagination = {}) => {
  return client.query({query: GetProductsDocument, variables: {...pagination}})
}

export const createUseProducts = (products: ProductsState) => () => {
  const client = useApolloClient()

  const addProducts = memoAction(createAddItems(products.list)())

  const getProduct = memoAction(createGetItem(products.list))

  const updateState = memoAction((state: LoadingState) => (products.state = state))

  const clearProducts = memoAction(createClearItems(products.list))

  const requestProducts = useMemo(() => createRequestProducts(client), [client])

  const requestGetProducts = useMemo(() => action(treatError(async (pagination: Pagination = {}) => {
    updateState('loading')
    const {data} = await requestProducts(pagination)

    addProducts(data.products)

    updateState('idle')
  }, () => {
    updateState('error')
  })), [addProducts, updateState, requestProducts])

  return {
    addProducts,
    clearProducts,
    getProduct,
    products,
    requestGetProducts,
  }
}

export const useProducts = createUseProducts(products)
