import {NonEmptyArray} from 'type-graphql/dist/interfaces/NonEmptyArray'
import FooResolver from './FooResolver'
import RecipeResolver from './RecipeResolver'
import ProductsResolver from './ProductsResolver'
import CouponResolver from './CouponResolver'

// eslint-disable-next-line @typescript-eslint/ban-types
export const resolvers: NonEmptyArray<Function> = [
  FooResolver,
  RecipeResolver,
  ProductsResolver,
  CouponResolver,
]
