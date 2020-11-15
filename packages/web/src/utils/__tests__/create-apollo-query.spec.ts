import {GetFooDocument} from 'api'
import {client} from 'src/__tests__/apollo-clinet-for-testing'
import {createApolloQuery} from '..'

describe('createApolloQuery', function test() {
  it('should create query', async function test() {
    fetchMock.mockResponseOnce(JSON.stringify({
      data: {
        foo: {
          foo: 'foo',
        },
      },
    }))
    const {data} = await createApolloQuery(GetFooDocument)(client)({})
    expect(data).toEqual({
      foo: {
        foo: 'foo',
      },
    })
  })
})
