import {CartItem} from '..'
import {Product} from '../../products'
import {calculateTotalPrice, getTotalPrice} from '../calulate-total-price'

const carts = new Map<string, CartItem>([
  ['1', {amount: 1, id: '1', productID: '2', purchase: true}],
  ['2', {amount: 3, id: '1', productID: '3', purchase: true}],
])
const products = new Map<string, Product>([
  ['1', {id: '1', price: 500, score: 1, title: 'foo'}],
  ['2', {availableCoupon: false, id: '2', price: 1000, score: 2, title: 'bar'}],
  ['3', {id: '3', price: 2000, score: 3, title: 'john'}],
])

describe('cartList', function test() {
  describe('getTotalPrice', function test() {
    it('should return total & coupon total', function test() {

      const result = getTotalPrice(carts, products)

      expect(result).toEqual({
        couponTotalPrice: 6000,
        totalPrice: 7000,
      })
    })
  })
  describe('calculate-total-price', function test() {
    it('should return total-price with an amount coupon', function test() {
      const result = calculateTotalPrice(carts, products, [{
        amount: 1000,
        type: 'amount',
      }])

      expect(result).toBe(6000)
    })
    it('should return total-price with an rate coupon', function test() {
      const result = calculateTotalPrice(carts, products, [{
        amount: 15,
        type: 'rate',
      }])

      expect(result).toBe(6100)
    })
  })
})
