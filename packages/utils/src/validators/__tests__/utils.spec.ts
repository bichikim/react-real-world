import {createIsLength, withError} from 'src/validators'

describe('utils', function test() {
  describe('withError', function test() {
    it('should return with an error', function test() {
      const result = withError('my-error')(createIsLength({max: 4}))('foo-bar')

      expect(result).toEqual('my-error')
    })

    it('should return false', function test() {
      const result = withError('my-error')(createIsLength({max: 4}))('foo')

      expect(result).toEqual(false)
    })

    it('should return true', function test() {
      const result = withError()(createIsLength({max: 4}))('foo-bar')

      expect(result).toEqual(true)
    })
  })
})
