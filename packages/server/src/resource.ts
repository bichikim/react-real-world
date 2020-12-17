import {PaginationArgs} from 'src/args/PaginationArgs'

export interface Resource<T> {
  get(id: string): T | undefined

  some(args: PaginationArgs): T[]
}
