import {arrayToMap} from 'src/array-to-map'

describe('array-to-map', function test() {
  it('should return a map', function test() {
    const result = arrayToMap(['foo', 'bar', 'john'], ['foo', 'bar', 'john'])

    expect(result).toEqual(new Map([
      ['foo', 'foo'],
      ['bar', 'bar'],
      ['john', 'john'],
    ]))
  })

  it('should return a map without undefined and null', function test() {
    const result = arrayToMap(['foo', null, undefined], ['foo', 'bar', 'john'])

    expect(result).toEqual(new Map([
      ['foo', 'foo'],
    ]))
  })
})
