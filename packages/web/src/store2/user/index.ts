import {
  createIndexedStructure,
  createStore,
  deleteItemInStructure,
  getItemInStructure,
  IndexRecord,
  setItemToStructure,
  useReactive,
} from 'src/utils'
import {LoadingState} from '../types'

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
  coupons: IndexRecord<Coupon>
  state: LoadingState
}

const couponIndex: (keyof Coupon)[] = ['id']

const store = createStore<UserState>({
  coupons: createIndexedStructure<Coupon>([], couponIndex),
  state: 'idle',
})

export const addCoupons = store.action((coupon: Coupon) => (draft: UserState) => {
  setItemToStructure(draft.coupons, coupon)
})

export const getCoupons = store.getter((draft) => {
  return (id: Coupon['id']) => {
    return getItemInStructure(draft.coupons, 'id', id)
  }
})

export const removeCoupons = store.action((id) => (draft) => {
  const item = getItemInStructure(draft.coupons, 'id', id)

  if (!item) {
    return
  }

  return deleteItemInStructure(draft.coupons, couponIndex, item)
})

export const useUser = (initState?: Partial<UserState>) => useReactive(
  store,
  initState,
)
