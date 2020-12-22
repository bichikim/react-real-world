import {AddProductArgs} from 'src/args/AddProductArgs'
import {Product} from 'src/entities/Product'
import {PaginationPiece} from 'src/pieces/PaginationPiece'
import {Resolver} from 'type-graphql'

@Resolver(() => Product)
export class ProductsResolver extends PaginationPiece(Product, AddProductArgs) {
}
