import {createStore, useReactive} from '@bichi/rare'

export interface CareListState {
  list: any[]
}

const store = createStore<CareListState>({
  list: [],
})

export const useCartList = (initState?: Partial<CareListState>) => useReactive({
  initState,
  store,
})
