import {amount, rate} from '../discount-logics'

describe('discount-logic', function test() {
  describe('amount', function test() {
    it('should discount with the amount', function test() {
      {
        const result = amount(1000)(2000)
        expect(result).toBe(1000)
      }
      {
        const result = amount(1000)(900)
        expect(result).toBe(0)
      }
      {
        const result = amount(1000, (value) => (value + 1))(2000)
        expect(result).toBe(1001)
      }
    })
  })
  describe('rate', function test() {
    it('should discount with the rate', function test() {
      {
        const result = rate(10)(2000)
        expect(result).toBe(1800)
      }
      {
        const result = rate(11.1)(200)
        expect(result).toBe(177)
      }
      {
        const result = rate(11.1, (value) => (value))(200)
        expect(result).toBe(177.8)
      }
    })
  })
})
