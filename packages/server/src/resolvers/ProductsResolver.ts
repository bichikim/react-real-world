import {Product} from 'src/objects/Product'
import {Arg, Query, Resolver} from 'type-graphql'
import {products} from 'src/data/products'


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
  async products() {
    return [...this._products]
  }
}

export default ProductResolver
