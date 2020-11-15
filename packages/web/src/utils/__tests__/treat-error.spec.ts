/* eslint-disable unicorn/error-message,promise/no-callback-in-promise */
import {treatRequest} from '..'

describe('treat-request', function test() {
  it('should handle request action', async function test() {
    const fakeResolve = (arg: string) => Promise.resolve(arg)
    const start = jest.fn(() => null)
    const done = jest.fn(() => null)
    const result = await treatRequest(fakeResolve, {
      done,
      start,
    })('foo')
    expect(start.mock.calls[0]).toEqual(['foo'])
    expect(done.mock.calls[0]).toEqual(['foo'])
    expect(result).toEqual('foo')

    start.mockClear()
    done.mockClear()
  })
  it('should ', async function test() {
    const fakeReject = (arg: string) => Promise.reject(new Error(arg))
    const start = jest.fn(() => null)
    const error = jest.fn(() => null)
    await treatRequest(fakeReject, {
      error, start,
    })('foo').catch(() => {
      throw new Error()
    })

    expect(start.mock.calls[0]).toEqual(['foo'])
    expect(error.mock.calls[0]).toEqual([new Error('foo')])
  })
  it('should ', async function test(done) {
    const fakeReject = (arg: string) => Promise.reject(new Error(arg))
    const start = jest.fn(() => null)
    const error = jest.fn(() => null)
    await treatRequest(fakeReject, {
      error, start,
      trowingError: true,
    })('foo').catch((error) => {
      expect(error).toEqual(new Error('foo'))
      done()
    })

    expect(start.mock.calls[0]).toEqual(['foo'])
    expect(error.mock.calls[0]).toEqual([new Error('foo')])
  })
})
