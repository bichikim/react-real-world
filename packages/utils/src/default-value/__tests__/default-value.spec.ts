import {defaultValue} from 'src/default-value'

describe('default-value', function test() {
  it('should return a value ', function test() {
    const result = defaultValue('foo')

    expect(result).toBe('foo')
  })

  it('should return a default value', function test() {
    const result = defaultValue<null | string>(null, 'foo')

    expect(result).toBe('foo')
  })

  it('should return a value with function type', function test() {
    const result = defaultValue(() => 'foo')

    expect(result).toBe('foo')
  })

  it('should return a default value with function type', function test() {
    const result = defaultValue<null | string>(null, () => 'foo')

    expect(result).toBe('foo')

  })
})
