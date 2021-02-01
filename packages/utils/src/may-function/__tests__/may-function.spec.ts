import {mayFunction} from 'src/may-function'

describe('may-function', function test() {
  it('should return value', function test() {
    const result = mayFunction('foo')

    expect(result).toBe('foo')
  })

  it('should return value with function type', function test() {
    const result = mayFunction(() => 'foo')

    expect(result).toBe('foo')
  })
})
