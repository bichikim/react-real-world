import {createIsLength} from 'src/validators'

describe('', function test() {
  it('should return true', function test() {
    const result = createIsLength({max: 5})('foo')
    expect(result).toBe(true)
  })
  it('should return false', function test() {
    const result = createIsLength({min: 4})('foo')

    expect(result).toBe(false)
  })
})
