import {overrideObjectValues} from '../'

describe('override-object-values', function test() {
  it('should return value', function test() {
    const result = overrideObjectValues({bar: 'bar', foo: 'foo'}, () => '')

    expect(result).toEqual({
      bar: '',
      foo: '',
    })
  })
})
