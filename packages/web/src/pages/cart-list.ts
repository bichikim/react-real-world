import {withLayout} from 'src/hooks'
import {DefaultLayout} from 'src/layout/default'
import {CartListPage} from 'src/views/cart-list'
import {withMiddlewares} from 'src/with-middlewares'
import {user} from 'src/store/user'

export default withLayout(DefaultLayout)(CartListPage)

export const getServerSideProps = withMiddlewares(async () => {
  await user.requestGetCoupons({})

  return {
    props: {
      coupons: [...user.state.coupons.values()],
    },
  }
})
