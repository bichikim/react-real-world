import {ApolloClient, useApolloClient} from '@apollo/client'
import {GetProductsDocument, GetProductsQuery, GetProductsQueryVariables} from 'api'
import {action, observable} from 'mobx'
import {LoadingState} from 'src/store/types'
import {createAddItems, createApolloQuery, createClearItems, createGetItem, treatRequest} from 'src/utils'
import {client} from 'src/apollo'

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
  products: Map<string, Product>
  state: LoadingState
}

export const defaultProduct: Partial<Product> = {availableCoupon: true}

export const createProducts = <TCacheShape>(client: ApolloClient<TCacheShape>) => {

  const state = observable<ProductsState>({
    products: new Map<string, Product>(),
    state: 'idle',
  })

  const addProducts = action(createAddItems(state.products)())

  const getProduct = action(createGetItem(state.products))

  const updateState = action((value: LoadingState) => (state.state = value))

  const clearProducts = action(createClearItems(state.products))

  const createRequestProducts =
    createApolloQuery<GetProductsQueryVariables, GetProductsQuery>(GetProductsDocument)

  const requestGetProducts = action(treatRequest(createRequestProducts(client), {
    done: ({data}) => {
      addProducts(data?.products)
      updateState('idle')
    },
    error: () => updateState('error'),
    start: () => updateState('loading'),
  }))

  return {
    addProducts,
    clearProducts,
    getProduct,
    requestGetProducts,
    state,
  }
}

export const products = createProducts(client)

export const useProducts = () => {
  const client = useApolloClient()

  return createProducts(client)
}
