import {arrayToObject} from 'src/array-to-object'

describe('array-to-object', function test() {
  it('should return key-value object', function test() {
    const result = arrayToObject(['foo', 'bar', 'john'], ['foo', 'bar', 'john'])

    expect(result).toEqual({
      bar: 'bar',
      foo: 'foo',
      john: 'john',
    })
  })

  it('should return key-value object without undefined and null', function test() {
    const result = arrayToObject(['foo', null, undefined], ['foo', 'bar', 'john'])

    expect(result).toEqual({
      foo: 'foo',
    })
  })
})
