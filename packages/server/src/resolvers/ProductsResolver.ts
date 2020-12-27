import {AddProductArgs} from 'src/args/AddProductArgs'
import {Product} from 'src/entities/Product'
import {CrudPiece} from 'src/pieces/CrudPiece'
import {Resolver} from 'type-graphql'

@Resolver(() => Product)
export class ProductsResolver extends CrudPiece(Product, AddProductArgs) {
}
