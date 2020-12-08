import {objectBind} from '../store'

describe('store', function test() {
  describe('object-bind', function test() {
    it('should bind', function test() {
      const result = objectBind({
        bar: 'bar',
        get foo() {
          return `${this.bar}/foo`
        },
      })
      expect(result.foo).toBe('bar/foo')
    })
  })
})
