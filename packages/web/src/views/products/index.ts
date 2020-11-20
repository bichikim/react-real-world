import {observer} from 'mobx-react-lite'
import {FC, createElement as h, useCallback} from 'react'
import {Box} from 'src/components/Box'
import {Product, useProducts} from 'src/store/products'
import {useCartList} from 'src/store/cart-list'
import {useOnce} from 'src/hooks'
import {ProductAndCart, ProductList} from './ProductList'

interface ProductsPageProps {
  offset: number
  products: ([string, Product])[]
  timestamp: number
}

export const ProductsPage: FC<ProductsPageProps> = observer((props) => {

  const {state, requestGetProducts, updatePagination, addProducts} = useProducts()

  useOnce(() => {
    const {products, timestamp, offset} = props
    addProducts(products)
    updatePagination({offset, timestamp})
  })

  const {products, state: loadState} = state

  const {putProductInCart, state: {getCartItemByProductID}} = useCartList()

  const showMoreText = loadState === 'loading' ? 'loading...' : 'show more'

  const productsList: ([string, ProductAndCart])[] = [...products].map(([key, item]) => {
    const newItem = {
      ...item,
      hasCart: Boolean(getCartItemByProductID(key)),
    }
    return [key, newItem]
  })

  const handleLoadMore = useCallback(() => {
    return requestGetProducts({})
  }, [requestGetProducts])

  return (
    h(Box, null,
      h(ProductList, {
        list: productsList,
        onChangeCart: putProductInCart,
      }),
      h(Box, {
        bg: 'black',
        color: 'white',
        cursor: 'pointer',
        fontSize: '20px',
        onClick: handleLoadMore,
        p: 10,
        textAlign: 'center',
      }, showMoreText),
    )
  )
})

ProductsPage.displayName = 'ProductsPage'
