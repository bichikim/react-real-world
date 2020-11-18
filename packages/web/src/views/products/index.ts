import {observer} from 'mobx-react-lite'
import {FC, createElement as h, useCallback, useEffect} from 'react'
import {Box} from 'src/components/Box'
import {useProducts} from 'src/store/products'
import {useCartList} from 'src/store/cart-list'
import {useImmer} from 'use-immer'
import {ProductList, SelectState} from './ProductList'

export const ProductsPage: FC = observer(() => {
  const [localState, updateState] = useImmer(() => {
    const selects = new Set<string>()

    return {
      selects,
    }
  })

  const updateSelects = useCallback(({key, value}: SelectState) => {
    updateState((draft) => {
      if (value) {
        draft.selects.add(key)
      } else {
        draft.selects.delete(key)
      }
    })
  }, [updateState])

  const {requestGetProducts, state: {products, state}} = useProducts()

  const {putProductInCart} = useCartList()

  const showLoading = state === 'loading'

  useEffect(() => {
    requestGetProducts({})
  }, [requestGetProducts])

  return (
    h(Box, {maxWidth: 1025, mx: 'auto'},
      h(Box, {fontSize: '20px', p: 10}, 'Production'),
      h(ProductList, {
        list: products,
        onAddCart: putProductInCart,
        onSelects: updateSelects,
        selects: localState.selects,
      }),
      h(Box, {bg: 'black', color: 'white', fontSize: '20px', p: 10, textAlign: 'center'}, 'show more'),
      showLoading && 'loading',
    )
  )
})
