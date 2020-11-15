import {ApolloError, ApolloProvider} from '@apollo/client'
import flush from 'flush-promises'
import {client} from 'src/__tests__/apollo-clinet-for-testing'
import {act, renderHook} from '@testing-library/react-hooks'
import {createElement as h} from 'react'
import {createProducts, useProducts} from '..'
import mockResultMore from './porducts-more.json'
import mockResult from './porducts.json'

const setup = () => {
  return createProducts(client)
}

const setupUse = () => {
  const wrapper = renderHook(() => (useProducts()), {
    wrapper: (props) => (h(ApolloProvider, {client}, props.children)),
  })

  return {
    ...wrapper,
  }
}

describe('products', function test() {
  describe('createProducts', function test() {

    beforeEach(() => {
      fetchMock.resetMocks()
    })

    describe('requestGetProducts', function test() {
      it('should request products', async function test() {
        const {state, requestGetProducts, clearProducts} = setup()

        expect(state.products.size).toBe(0)

        expect(state.state).toBe('idle')

        fetchMock.mockResponseOnce(JSON.stringify(mockResult))

        requestGetProducts({})

        expect(state.state).toBe('loading')

        await flush()

        expect(state.state).toBe('idle')

        expect(fetchMock.mock.calls.length).toBe(1)

        expect(fetchMock.mock.calls[0]).toMatchSnapshot()

        expect([...state.products.entries()]).toMatchSnapshot()

        fetchMock.mockResponseOnce(JSON.stringify(mockResultMore))

        requestGetProducts({
          offset: 5,
          sort: true,
          take: 5,
        })

        expect(state.state).toBe('loading')

        await flush()

        expect(state.state).toBe('idle')

        expect([...state.products.entries()]).toMatchSnapshot()

        fetchMock.mockRejectOnce(new ApolloError({}))

        requestGetProducts({
          sort: false,
        })

        expect(state.state).toBe('loading')

        await flush()

        expect(state.state).toBe('error')

        clearProducts()

        expect(state.products.size).toBe(0)
      })
    })

    describe('getProduct', function test() {
      it('should get one product', async function test() {
        const {state, requestGetProducts, getProduct} = setup()

        expect(state.products.size).toBe(0)

        fetchMock.mockResponseOnce(JSON.stringify(mockResult))

        requestGetProducts({})

        await flush()

        expect(getProduct('tpP45lSwqf1X1yEEFqL4')).toMatchSnapshot()
      })
    })
  })
  describe('useProducts', function test() {
    it('should work like the createProducts', async function test() {
      const {result} = setupUse()
      fetchMock.mockResponseOnce(JSON.stringify(mockResult))
      act(() => {
        result.current.requestGetProducts({})
      })

      await flush()

      expect(result.current.state.products.size).toBe(5)
    })
    it('should create Products once', function test() {
      const {result, rerender} = setupUse()

      const first = result.current

      act(() => {
        rerender({})
      })

      expect(result.current).toBe(first)
    })
  })
})
