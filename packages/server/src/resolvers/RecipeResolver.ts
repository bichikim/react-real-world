import {Recipe} from 'src/objects/Recipe'
import {Arg, Query, Resolver} from 'type-graphql'

@Resolver(Recipe)
export class RecipeResolver {
  private _recipeService: Recipe[]

  constructor(recipeService?: any) {
    if (recipeService) {
      this._recipeService = recipeService
    } else {
      this._recipeService = [
        {
          creationDate: new Date(),
          id: '1',
          ingredients: ['foo', 'bar'],
          title: 'foo',
        },
      ]
    }
  }

  @Query(() => Recipe)
  async recipe(@Arg('id') id: string) {
    const recipe = this._recipeService.find(({id: _id}) => id === _id)
    if (typeof recipe === 'undefined') {
      throw new TypeError(id)
    }
    return recipe
  }
}


export default RecipeResolver
