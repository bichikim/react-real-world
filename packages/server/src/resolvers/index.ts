import {NonEmptyArray} from 'type-graphql/dist/interfaces/NonEmptyArray'

import {ProductsResolver} from './ProductsResolver'
import {ServerStateResolver} from './ServerStateResolver'

// eslint-disable-next-line @typescript-eslint/ban-types
export const resolvers: NonEmptyArray<Function> = [
  ProductsResolver, ServerStateResolver,
]
