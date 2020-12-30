export type IteratorExecution<T, R = any> = (value: T) => R

export const iteratorMapGenerator = function *<T, R>(
  values: IterableIterator<T>,
  execute: IteratorExecution<T, R>,
): IterableIterator<R> {
  let next: IteratorResult<T> = values.next()

  while (!next.done) {
    yield execute(next.value)
    next = values.next()
  }
}

export const iteratorMap = <T, R>(values: IterableIterator<T>, execute: IteratorExecution<T>): R[] => {
  const executeIterator = iteratorMapGenerator(values, execute)

  return [...executeIterator]
}
