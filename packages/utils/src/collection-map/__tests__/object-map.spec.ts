import {collectionAsyncMap, collectionMap, objectAsyncMap, objectMap} from 'src/collection-map'

describe('collection-map', function test() {
  describe('object-map', function test() {
    it('should loop an object', function test() {
      const result = objectMap(
        {bar: 'bar', foo: 'foo'},
        (value) => (value + '_'),
      )

      expect(result).toEqual({
        bar: 'bar_',
        foo: 'foo_',
      })
    })

    it('should loop a map', function test() {
      const result = collectionMap(
        new Map([['bar', 'bar'], ['foo', 'foo']]),
        (value) => (value + '_'),
      )

      expect(result).toEqual(new Map([['bar', 'bar_'], ['foo', 'foo_']]))
    })
  })

  describe('collection-async-map', function test() {
    it('should loop an object with async function', async function test() {
      const result = await objectAsyncMap(
        {bar: 'bar', foo: 'foo'},
        (value) => Promise.resolve(value + '_'),
      )

      expect(result).toEqual({
        bar: 'bar_',
        foo: 'foo_',
      })
    })

    it('should loop a map with async function', async function test() {
      const result = await collectionAsyncMap(
        new Map([['bar', 'bar'], ['foo', 'foo']]),
        (value) => Promise.resolve(value + '_'),
      )

      expect(result).toEqual(new Map([['bar', 'bar_'], ['foo', 'foo_']]))
    })
  })
})
