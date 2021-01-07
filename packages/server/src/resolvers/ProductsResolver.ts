import {Product} from 'src/entities/Product'
import {CrudPiece} from 'src/pieces/CrudPiece'
import {ArgsType, Field, Resolver} from 'type-graphql'

import {MaxLength} from 'class-validator'

const MAX_TITLE = 250

@ArgsType()
export class AddProductArgs {
  @Field()
  @MaxLength(MAX_TITLE)
  title: string

  @Field()
  description: string
}

@ArgsType()
export class UpdateProductArgs {
  @Field({nullable: true})
  @MaxLength(MAX_TITLE)
  title?: string

  @Field({nullable: true})
  description?: string
}

@Resolver(() => Product)
export class ProductsResolver extends CrudPiece(
  Product,
  {add: AddProductArgs, update: UpdateProductArgs},
) {
}
