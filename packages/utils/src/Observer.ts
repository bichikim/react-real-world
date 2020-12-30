import {IteratorExecution, iteratorMap} from 'src/iterator-map'

export class Observer<T> {
  private subscribes: Set<T> = new Set<T>()

  subscribe(subscribes: T) {
    this.subscribes.add(subscribes)
  }

  unsubscribe(subscribes: T) {
    this.subscribes.delete(subscribes)
  }

  subscribeMany(subscribes: T[]) {
    subscribes.forEach((subscribe) => this.subscribe(subscribe))
  }

  fire<R>(execute: IteratorExecution<T, R>): R[] {
    const values = this.subscribes.values()

    return iteratorMap(values, execute)
  }
}
