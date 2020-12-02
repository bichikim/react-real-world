import {ProductsPage} from 'src/views/products'
import {withMiddlewares} from 'src/with-middlewares'
import {withLayout} from 'src/hooks'
import {DefaultLayout} from 'src/layout/default'

export default withLayout(DefaultLayout)(ProductsPage)

export const getServerSideProps = withMiddlewares(async () => {

  return {
    props: {
    },
  }
})

