import {NonEmptyArray} from 'type-graphql/dist/interfaces/NonEmptyArray'
import FooResolver from './FooResolver'
import RecipeResolver from './RecipeResolver'

// eslint-disable-next-line @typescript-eslint/ban-types
export const resolvers: NonEmptyArray<Function> = [
  FooResolver,
  RecipeResolver,
]
