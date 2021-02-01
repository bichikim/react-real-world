import {isFunction} from 'src/is-function'

describe('is-function', function test() {
  it('should return true with function', function test() {
    const result = isFunction(() => null)

    expect(result).toEqual(true)
  })
  it('should retrun ture with object function', function test() {
    const result = isFunction(Object.assign(() => null, {foo: 'foo'}))

    expect(result).toEqual(true)
  })
  it('should return false with object', function test() {
    const result = isFunction({})

    expect(result).toEqual(false)
  })
  it('should return false with null', function test() {
    const result = isFunction(null)

    expect(result).toEqual(false)
  })
  it('should return false with number', function test() {
    const result = isFunction(3)
    expect(result).toEqual(false)
  })

  it('should return false with string', function test() {
    const result = isFunction('3')

    expect(result).toEqual(false)
  })

  it('should retunr false with boolean', function test() {
    const reulst = isFunction(true)

    expect(reulst).toEqual(false)
  })
})
