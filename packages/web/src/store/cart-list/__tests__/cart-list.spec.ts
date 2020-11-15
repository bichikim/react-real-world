import {ApolloProvider} from '@apollo/client'
import {createProducts} from 'src/store/products'
import {createUser} from 'src/store/user'
import {client} from 'src/__tests__/apollo-clinet-for-testing'
import productsDataMock from 'src/store/products/__tests__/porducts.json'
import couponsDataMock from 'src/store/user/__tests__/coupons.json'
import {act, renderHook} from '@testing-library/react-hooks'
import {createElement as h} from 'react'
import {createCartList, useCartList} from '..'

const setup = async () => {
  const products = createProducts(client)
  fetchMock.mockResponseOnce(JSON.stringify(productsDataMock))
  await products.requestGetProducts({})

  const user = createUser(client)
  fetchMock.mockResponseOnce(JSON.stringify(couponsDataMock))
  await user.requestGetCoupons({})

  return {
    cartList: createCartList({max: 3, products, user}),
    products,
    user,
  }
}

const setupUse = async () => {
  const products = createProducts(client)
  fetchMock.mockResponseOnce(JSON.stringify(productsDataMock))
  await products.requestGetProducts({})

  const user = createUser(client)
  fetchMock.mockResponseOnce(JSON.stringify(couponsDataMock))
  await user.requestGetCoupons({})

  const wrapper = renderHook(() => (useCartList({
    products, user,
  })), {
    wrapper: (props) => (h(ApolloProvider, {client}, props.children)),
  })

  return {
    products,
    user,
    ...wrapper,
  }
}

describe('cart-list', function test() {
  describe('createCartList', function test() {

    describe('putProductInCart', function test() {
      it('should put & increase a product in the cart', async function test() {
        const {cartList, products} = await setup()

        const product = products.state.products.values().next().value

        cartList.putProductInCart(product.id)

        expect(cartList.state.cartList.size).toBe(1)

        {
          const cartItem = cartList.state.cartList.values().next().value

          expect(cartItem.productID).toEqual(product.id)
          expect(cartItem.amount).toBe(1)
          expect(cartItem.purchase).toBe(false)
        }

        cartList.putProductInCart(product.id)

        expect(cartList.state.cartList.size).toBe(1)

        {
          const cartItem = cartList.state.cartList.values().next().value

          expect(cartItem.productID).toEqual(product.id)
          expect(cartItem.amount).toBe(2)
          expect(cartItem.purchase).toBe(false)
        }

        cartList.putProductInCart(product.id, 3)

        expect(cartList.state.cartList.size).toBe(1)

        {
          const cartItem = cartList.state.cartList.values().next().value

          expect(cartItem.productID).toEqual(product.id)
          expect(cartItem.amount).toBe(5)
          expect(cartItem.purchase).toBe(false)
        }
      })
      it('should put & decrease a product in the cart', async function test() {
        const {cartList, products} = await setup()

        const product = products.state.products.values().next().value

        cartList.putProductInCart(product.id, 2)

        expect(cartList.state.cartList.size).toBe(1)

        {
          const cartItem = cartList.state.cartList.values().next().value

          expect(cartItem.productID).toEqual(product.id)
          expect(cartItem.amount).toEqual(2)
        }

        cartList.putProductInCart(product.id, -1)

        {
          const cartItem = cartList.state.cartList.values().next().value

          expect(cartItem.productID).toEqual(product.id)
          expect(cartItem.amount).toEqual(1)
        }

        cartList.putProductInCart(product.id, -2)

        expect(cartList.state.cartList.size).toBe(0)
      })
      it('should not put with negative amount', async function test() {
        const {cartList, products} = await setup()

        const product = products.state.products.values().next().value

        cartList.putProductInCart(product.id, -1)

        expect(cartList.state.cartList.size).toBe(0)
      })
    })

    describe('total price', function test() {
      it('should get total price', async function test() {
        const {cartList, products, user} = await setup()

        const iterableProducts = products.state.products.values()

        const product1 = iterableProducts.next().value
        const product2 = iterableProducts.next().value

        cartList.putProductsInCart([
          {amount: 1, productID: product1.id},
          {amount: 2, productID: product2.id},
        ])

        expect(cartList.state.totalPrice).toBe(product1.price + product2.price * 2)

        const coupon = user.state.coupons.values().next().value

        cartList.addCoupon(coupon.id)

        expect(cartList.state.totalPrice).toBe(product1.price + (product2.price * 2 / 100 * (100 - 10)))
      })
    })

    describe('remove', function test() {
      it('should ', async function test() {
        const {cartList, products} = await setup()

        const iterableProducts = products.state.products.values()

        const product1 = iterableProducts.next().value

        cartList.putProductInCart(product1.id)

        expect(cartList.state.cartList.size).toBe(1)

        cartList.removeCartItemByProductID(product1.id)

        expect(cartList.state.cartList.size).toBe(0)
      })
    })

    describe('putProductsInCart', function test() {
      it('should create and', async function test() {
        const {cartList, products} = await setup()

        const iterableProducts = products.state.products.values()

        const product1 = iterableProducts.next().value
        const product2 = iterableProducts.next().value

        cartList.putProductsInCart([
          {amount: 1, productID: product1.id},
          {amount: 2, productID: product2.id},
        ])

        {

          const cartItem1 = cartList.getCartItemByProductID(product1.id)
          const cartItem2 = cartList.getCartItemByProductID(product2.id)

          expect(cartItem1.productID).toEqual(product1.id)
          expect(cartItem2.productID).toEqual(product2.id)
          expect(cartItem1.amount).toEqual(1)
          expect(cartItem2.amount).toEqual(2)
        }
      })
    })
  })

  describe('useUser', function test() {
    it('should work like createUser', async function test() {
      const {products, result, user} = await setupUse()

      const iterableProducts = products.state.products.values()
      const product1 = iterableProducts.next().value
      const product2 = iterableProducts.next().value

      act(() => {
        result.current.putProductsInCart([
          {amount: 1, productID: product1.id},
          {amount: 2, productID: product2.id},
        ])
      })

      expect(result.current.state.totalPrice).toBe(product1.price + product2.price * 2)

      const coupon = user.state.coupons.values().next().value

      act(() => {
        result.current.addCoupon(coupon.id)
      })

      expect(result.current.state.totalPrice).toBe(product1.price + (product2.price * 2 / 100 * (100 - 10)))
    })
    it('should create User once', async function test() {
      const {result, rerender} = await setupUse()

      const first = result.current

      act(() => {
        rerender({})
      })

      expect(result.current).toBe(first)
    })
  })
})
