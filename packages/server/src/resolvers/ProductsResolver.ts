import {Product} from 'src/objects/Product'
import {Resolver} from 'type-graphql'
import {PaginationPiece} from 'src/pieces/PaginationPiece'
import {Resource} from 'src/resource'

const record: Record<string, Omit<Product, 'id'>> = {
  1: {
    description: 'foo',
    thumbnail: 'somewhere',
    title: 'foo',
  },
}

class ProductResource implements Resource<Product> {
  get(id: string): Product | undefined {
    return {
      ...record[id],
      id,
    }
  }
  some(args) {
    return []
  }
}

const productResource = new ProductResource()

@Resolver()
export class ProductsResolver extends PaginationPiece<Product>(Product, productResource) {
}
