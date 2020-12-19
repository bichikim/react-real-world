import {PaginationArgs} from 'src/args/PaginationArgs'

export interface Resource<T, AA> {
  add(args: AA): Promise<T>

  get(id: string): Promise<T | undefined>

  some(args: PaginationArgs): Promise<T[]>
}
