import {ProductsPage} from 'src/views/products'
import {withMiddlewares} from 'src/with-middlewares'
import {withLayout} from 'src/hooks'
import {DefaultLayout} from 'src/layout/default'
import {products} from 'src/store/products'

export default withLayout(DefaultLayout)(ProductsPage)

export const getServerSideProps = withMiddlewares(async () => {
  await products.requestGetProducts({offset: 0})

  return {
    props: {
      offset: products.state.offset,
      products: [...products.state.products.values()],
      timestamp: products.state.timestamp,
    },
  }
})

