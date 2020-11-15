import {isPromise} from '..'

describe('isPromise', function test() {
  it('should return true with a promise', function test() {
    expect(isPromise(Promise.resolve())).toBe(true)
  })
  it('should return false without a promise', function test() {
    expect(isPromise({})).toBe(false)
    expect(isPromise('foo')).toBe(false)
  })
})
