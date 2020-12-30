import {isPromise} from 'src/is-promise'

describe('is-promise', function test() {
  it('should be promise', function test() {
    const result = isPromise(Promise.resolve())

    expect(result).toBe(true)
  })

  it('should not be promise', function test() {
    const result = isPromise(false)

    expect(result).toBe(false)
  })
})
