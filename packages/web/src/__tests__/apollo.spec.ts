import {client} from 'src/apollo'
import {ApolloClient, gql} from '@apollo/client'
import fetchMock from 'jest-fetch-mock'
import {apiUrl} from 'src/env'

describe('apollo', function test() {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  describe('client', function test() {
    it('should be apollo client', function test() {
      expect(client).toBeInstanceOf(ApolloClient)
    })
    it('should fetch query', async function test() {
      const query = gql`
        query {
          foo {
            foo
          }
        }
      `
      fetchMock.mockResponse(JSON.stringify({
        data: {
          foo: {
            foo: 'foo',
          },
        },
      }))
      await client.query({query})
      const fetchMockCalls = fetchMock.mock.calls
      expect(fetchMockCalls.length).toBe(1)
      const url = fetchMockCalls[0][0]
      const request = fetchMockCalls[0][1]
      expect(url).toBe(apiUrl())
      expect(request.method).toBe('POST')
      expect(request.body).toMatchSnapshot()
    })
  })
})
