import {Coupon} from 'src/objects/Coupon'
import {Arg, Query, Resolver} from 'type-graphql'
const coupons: Coupon[] = [
  {
    discountRate: 10,
    id: '1',
    title: '10% 할인 쿠폰',
    type: 'rate',
  },
  {
    discountAmount: 10000,
    id: '2',
    title: '10,000원 할인 쿠폰',
    type: 'amount',
  },
]

@Resolver(Coupon)
export class CouponResolver {
  private readonly _coupons: Coupon[]

  constructor() {
    this._coupons = [...coupons]
  }

  @Query(() => Coupon)
  async coupon(@Arg('id') id: string) {
    const recipe = this._coupons.find(({id: _id}) => id === _id)
    if (typeof recipe === 'undefined') {
      throw new TypeError(id)
    }
    return recipe
  }

  @Query(() => [Coupon])
  async coupons() {
    return [...this._coupons]
  }
}

export default CouponResolver
