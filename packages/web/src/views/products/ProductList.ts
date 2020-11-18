import {FC, createElement as h, useCallback} from 'react'
import {Box} from 'src/components/Box'
import {Product} from 'src/store/products'
import {ProductItem} from './ProductItem'

export interface ProductListProps {
  list: Map<string, Product>
  onAddCart?: (id: string) => any
  onSelects?: (value: SelectState) => any
  selects: Set<string>
}

export interface SelectState {
  key: string
  value: boolean
}

export const ProductList: FC<ProductListProps> = (props) => {
  const {list, selects, onSelects, onAddCart} = props

  const handleSelect = useCallback((value: SelectState) => {
    onSelects && onSelects(value)
  }, [onSelects])

  const handleAddCart = useCallback((id) => {
    onAddCart && onAddCart(id)
  }, [onAddCart])

  return (
    h(Box, null,
      [...list.entries()].map(([key, product]) => {
        return h(ProductItem, {
          ...product,
          key,
          onAddCart: handleAddCart,
          onChange: (value) => (handleSelect({key, value})),
          value: selects.has(key),
        })
      }),
    )
  )
}

