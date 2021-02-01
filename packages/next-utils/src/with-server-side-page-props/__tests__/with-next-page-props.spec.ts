import {createRequest, createResponse} from 'node-mocks-http'
import {GetServerSidePropsContext} from 'next'
import {createWithServerSideProps} from '..'

interface MyServerSideOptions {
  foo: string
}

interface MyServerSizeProps {
  my: {
    foo: string
    method?: string
  }
}

const setup = (): {context: GetServerSidePropsContext} => {
  const res = createResponse()
  const req = createRequest({
    method: 'CONNECT',
  })

  const AppTree: any = {}

  const context = {
    AppTree,
    query: {},
    req,
    res,
    resolvedUrl: '/foo',
  }

  return {
    context,
  }
}

describe('with-next-page-props', function test() {
  it('should return a with-page-props function', async function test() {
    const {context} = setup()

    const withMyServerSide = createWithServerSideProps<MyServerSizeProps, MyServerSideOptions>(
      (context, options) => {
        return Promise.resolve({
          props: {
            my: {
              foo: options.foo,
              method: context.req?.method,
            },
          },
        })
      })

    const result = await withMyServerSide({foo: 'foo'})(() => {
      return Promise.resolve({
        props: {
          bar: 'bar',
        },
      })
    })(context)

    expect(result).toEqual({
      props: {
        bar: 'bar',
        my: {
          foo: 'foo',
          method: 'CONNECT',
        },
      },
    })
  })
})
