import {ApolloError, ApolloProvider} from '@apollo/client'
import flush from 'flush-promises'
import {client} from 'src/__tests__/apollo-clinet-for-testing'
import mockResult from 'src/store/products/__tests__/porducts.json'
import {act, renderHook} from '@testing-library/react-hooks'
import {createElement as h} from 'react'
import {createUser, user, useUser} from '..'
import couponsMock from './coupons.json'

const setup = () => {
  return createUser(client)
}

const setupUse = () => {
  const wrapper = renderHook(() => (useUser()), {
    wrapper: (props) => (h(ApolloProvider, {client}, props.children)),
  })

  return {
    ...wrapper,
  }
}

describe('user', function test() {
  describe('createUser', function test() {

    beforeEach(() => {
      fetchMock.resetMocks()
      user.state.coupons.clear()
    })

    it('should have all members', function test() {
      const {state, getCoupon, requestGetCoupons, updateState, addCoupons} = setup()
      expect(state).toBeObject()
      expect(getCoupon).toBeFunction()
      expect(requestGetCoupons).toBeFunction()
      expect(updateState).toBeFunction()
      expect(addCoupons).toBeFunction()
    })

    describe('requestGetCoupons', function test() {
      it('should request get coupons', async function test() {
        const {state, requestGetCoupons} = setup()

        expect(state.coupons.size).toBe(0)
        expect(state.state).toBe('idle')

        fetchMock.mockResponseOnce(JSON.stringify(couponsMock))

        requestGetCoupons({})

        expect(state.state).toBe('loading')

        await flush()

        expect(state.state).toBe('idle')

        expect([...state.coupons.entries()]).toMatchSnapshot()

        fetchMock.mockRejectOnce(new ApolloError({}))

        requestGetCoupons({})

        expect(state.state).toBe('loading')

        await flush()

        expect(state.state).toBe('error')
      })
    })

    describe('getCoupon', function test() {
      it('should get on coupon', async function test() {
        const {state, getCoupon, requestGetCoupons} = setup()

        expect(state.coupons.size).toBe(0)

        fetchMock.mockResponseOnce(JSON.stringify(mockResult))

        requestGetCoupons({})

        await flush()

        expect(getCoupon('1')).toMatchSnapshot()
      })
    })
  })
  describe('useUser', function test() {
    it('should work like createUser', async function test() {
      const {result} = setupUse()

      fetchMock.mockResponseOnce(JSON.stringify(couponsMock))

      act(() => {
        result.current.requestGetCoupons({})
      })

      await flush()

      expect(result.current.state.coupons.size).toEqual(2)
    })
  })
})
