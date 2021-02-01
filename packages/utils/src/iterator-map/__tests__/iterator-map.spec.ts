import {iteratorMap} from 'src/iterator-map'

describe('iterator-map', function test() {
  it('should map iterator', function test() {
    const result = iteratorMap(new Set(['foo', 'bar']).values(), (value) => `${value}_`)

    expect(result).toEqual(['foo_', 'bar_'])
  })
})
