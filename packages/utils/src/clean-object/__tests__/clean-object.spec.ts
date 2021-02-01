import {cleanObject} from 'src/clean-object'

describe('clean-object', function test() {
  it('should clean empty key value', function test() {
    const result = cleanObject({
      bar: undefined,
      foo: 'foo',
    })

    expect(result).toEqual({
      foo: 'foo',
    })
  })
})
