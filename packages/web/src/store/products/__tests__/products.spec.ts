import {act, renderHook} from '@testing-library/react-hooks'
import {client} from 'src/apollo'
import {ApolloError, ApolloProvider} from '@apollo/client'
import {FC, createElement as h} from 'react'
import flush from 'flush-promises'
import {products, useProducts} from '..'
import mockResult from './porducts.json'
import mockResultMore from './porducts-more.json'

const Provider: FC = ({children}) => {
  return (
    h(ApolloProvider, {client}, children)
  )
}

const setup = () => {
  const wrapper = renderHook(() => useProducts(), {wrapper: Provider})
  return {
    ...wrapper,
  }
}

describe('products', function test() {
  describe('useProducts', function test() {

    beforeEach(() => {
      fetchMock.resetMocks()
      products.list.clear()
    })

    it('should have all members', function test() {
      const {result} = setup()
      expect(result.current.products).toBeObject()
      expect(result.current.requestGetProducts).toBeFunction()
      expect(result.current.addProducts).toBeFunction()
      expect(result.current.getProduct).toBeFunction()
    })

    describe('requestGetProducts', function test() {
      it('should request products', async function test() {
        const {result} = setup()

        expect(result.current.products.list.size).toBe(0)

        expect(result.current.products.state).toBe('idle')
        fetchMock.mockResponseOnce(JSON.stringify(mockResult))
        act(() => {

          result.current.requestGetProducts()
        })

        expect(result.current.products.state).toBe('loading')

        await flush()

        expect(result.current.products.state).toBe('idle')

        expect(fetchMock.mock.calls.length).toBe(1)
        expect(fetchMock.mock.calls[0]).toMatchSnapshot()
        expect([...result.current.products.list.entries()]).toMatchSnapshot()
        fetchMock.mockResponseOnce(JSON.stringify(mockResultMore))
        act(() => {
          result.current.requestGetProducts({
            offset: 5,
            sort: true,
            take: 5,
          })
        })

        expect(result.current.products.state).toBe('loading')

        await flush()

        expect(result.current.products.state).toBe('idle')

        expect([...result.current.products.list.entries()]).toMatchSnapshot()

        fetchMock.resetMocks()
        fetchMock.mockRejectOnce(new ApolloError({}))
        act(() => {
          result.current.requestGetProducts({
            sort: false,
          })
        })

        expect(result.current.products.state).toBe('loading')

        await flush()

        expect(result.current.products.state).toBe('error')

        act(() => {
          result.current.clearProducts()
        })

        expect(result.current.products.list.size).toBe(0)
      })
    })

    describe('getProduct', function test() {
      it('should get one product', async function test() {
        const {result} = setup()

        expect(result.current.products.list.size).toBe(0)

        fetchMock.mockResponseOnce(JSON.stringify(mockResult))
        act(() => {

          result.current.requestGetProducts()
        })

        await flush()

        expect(result.current.getProduct('tpP45lSwqf1X1yEEFqL4')).toMatchSnapshot()
      })
    })
  })
})
