import {ProductsPage} from 'src/views/products'
import {withMiddlewares} from 'src/with-middlewares'

export default ProductsPage

export const getServerSideProps = withMiddlewares()

