import {Product} from 'src/objects/Product'
import {Arg, Query, Resolver} from 'type-graphql'
import {products} from 'src/data/products'
import {take as _take, drop, sortBy} from 'lodash'

const DEFAULT_TAKE = 5

@Resolver(Product)
export class ProductResolver {
  private readonly _products: Product[]

  constructor() {
    this._products = [...products]
  }

  @Query(() => Product)
  async product(@Arg('id') id: string) {
    const recipe = this._products.find(({id: _id}) => id === _id)
    if (typeof recipe === 'undefined') {
      throw new TypeError(id)
    }
    return recipe
  }

  @Query(() => [Product])
  async products(
    @Arg('offset', {nullable: true}) offset: number = 0,
    @Arg('take', {nullable: true}) take: number = DEFAULT_TAKE,
    @Arg('sort', {nullable: true}) sort: boolean = false,
  ) {
    const products = sort ? sortBy(this._products, ['score']) : [...this._products]

    return _take(drop(products, offset), take)
  }
}

export default ProductResolver
