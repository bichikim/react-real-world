import {FC, createElement as h, useCallback} from 'react'
import {Box} from 'src/components/Box'
import {Product} from 'src/store/products'
import {ProductItem} from './ProductItem'

export interface ProductAndCart extends Product {
  hasCart?: boolean
}

export interface ProductListProps {
  list: ([string, ProductAndCart])[]
  onChangeCart?: (id: string, amount?: number) => any
}

export const ProductList: FC<ProductListProps> = (props) => {
  const {list, onChangeCart} = props

  const handleChangeCart = useCallback((id: string, amount?: number) => {
    onChangeCart?.(id, amount)
  }, [onChangeCart])

  return (
    h(Box, null,
      list.map(([key, product]) => {
        return h(ProductItem, {
          ...product,
          key,
          onChangeCart: handleChangeCart,
        })
      }),
    )
  )
}

