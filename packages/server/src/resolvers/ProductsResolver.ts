import {PaginationArgs} from 'src/args/PaginationArgs'
import {Product} from 'src/objects/Product'
import {Resolver} from 'type-graphql'
import {PaginationPiece} from 'src/pieces/PaginationPiece'
import {Resource} from 'src/resource'
import {AddProductArgs} from 'src/args/AddProductArgs'

const record = new Map<string, Omit<Product, 'id'>>()

record.set('0', {
  description: 'foo',
  thumbnail: 'somewhere',
  title: 'foo',
})

class ProductResource implements Resource<Product, AddProductArgs> {
  get(id: string) {
    return Promise.resolve({
      ...record[id],
      id,
    })
  }
  some(args: PaginationArgs) {
    return Promise.resolve([])
  }

  add(args) {
    const id = String(record.size)
    record.set(id, args)
    return Promise.resolve({
      id,
      ...args,
    })
  }
}

const productResource = new ProductResource()

@Resolver()
export class ProductsResolver extends PaginationPiece(Product, AddProductArgs, productResource) {
}
