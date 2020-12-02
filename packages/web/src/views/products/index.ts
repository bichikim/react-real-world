import {FC, createElement as h} from 'react'
import {Box} from 'src/components/Box'

interface ProductsPageProps {
  offset: number
  timestamp: number
}

export const ProductsPage: FC<ProductsPageProps> = () => {

  return (
    h(Box, null, 'product',
    )
  )
}

ProductsPage.displayName = 'ProductsPage'
