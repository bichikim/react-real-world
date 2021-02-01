import {createIsInt} from 'src/validators'

describe('is-int', function test() {
  it('should return true', function test() {
    const result = createIsInt()('1')

    expect(result).toBe(true)
  })

  it('should return false', function test() {
    const result = createIsInt()('foo')

    expect(result).toBe(false)
  })
})
