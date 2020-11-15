import {ApolloClient, useApolloClient} from '@apollo/client'
import {action, observable} from 'mobx'
import {GetCouponsDocument, GetCouponsQuery, GetCouponsQueryVariables} from 'api'
import {createAddItems, createApolloQuery, createGetItem, treatRequest} from 'src/utils'
import {LoadingState} from 'src/store/types'
import {client} from 'src/apollo'

export interface Coupon {
  /**
   * how much to discount
   * @default 0
   */
  amount?: number
  id: string
  title: string
  type: 'amount' | 'rate' | string
}

export interface UserState {
  coupons: Map<string, Coupon>
  state: LoadingState
}

export const createUser = <TCacheShape>(client: ApolloClient<TCacheShape>) => {
  const state = observable<UserState>({
    coupons: new Map<string, Coupon>(),
    state: 'idle',
  })

  const getCoupon = action(createGetItem(state.coupons))

  const addCoupons = action(createAddItems(state.coupons)())

  const updateState = (value: LoadingState) => (state.state = value)

  const createRequestCoupons = action(
    createApolloQuery<GetCouponsQueryVariables, GetCouponsQuery>(GetCouponsDocument),
  )

  const requestGetCoupons = action(treatRequest(createRequestCoupons(client), {
    done: ({data}) => {
      addCoupons(data?.coupons.map(({title, type, discountAmount, discountRate, id}) => {

        return {
          amount: discountAmount ?? discountRate,
          id,
          title,
          type,
        }
      }))
      updateState('idle')
    },
    error: () => updateState('error'),
    start: () => updateState('loading'),
  }))

  return {
    addCoupons,
    getCoupon,
    requestGetCoupons,
    state,
    updateState,
  }
}

export const user = createUser(client)

export const useUser = () => {
  const client = useApolloClient()

  return createUser(client)
}
