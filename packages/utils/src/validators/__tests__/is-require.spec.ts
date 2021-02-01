import {createIsRequire} from 'src/validators'

describe('is-require', function test() {
  it('should return false', function test() {
    const result = createIsRequire()(undefined)

    expect(result).toBe(false)
  })

  it('should return true', function test() {
    const result = createIsRequire()(1)

    expect(result).toBe(true)
  })
})
