import isEqual from 'react-fast-compare'
import {whenEqual} from 'src/when-equal'

describe('when equal', function test() {
  it('should run the pass', function test() {
    const pass = jest.fn(() => null)
    const notPass = jest.fn(() => null)
    whenEqual('foo', 'foo', {
      notPass,
      pass,
    })

    expect(pass.mock.calls.length).toBe(1)
    expect(notPass.mock.calls.length).toBe(0)
  })

  it('should run the not-pass', function test() {
    const pass = jest.fn(() => null)
    const notPass = jest.fn(() => null)
    whenEqual('foo', 'bar', {
      notPass,
      pass,
    })

    expect(pass.mock.calls.length).toBe(0)
    expect(notPass.mock.calls.length).toBe(1)
  })

  it('should run the pass with a custom equal function', function test() {
    const pass = jest.fn(() => null)
    const notPass = jest.fn(() => null)

    whenEqual({foo: 'foo'}, {foo: 'foo'}, {
      notPass,
      pass,
    }, isEqual)

    expect(pass.mock.calls.length).toBe(1)
    expect(notPass.mock.calls.length).toBe(0)
  })

  it('should run the not-pass with a custom equal function', function test() {
    const pass = jest.fn(() => null)
    const notPass = jest.fn(() => null)

    whenEqual({foo: 'foo'}, {foo: 'bar'}, {
      notPass,
      pass,
    }, isEqual)

    expect(pass.mock.calls.length).toBe(0)
    expect(notPass.mock.calls.length).toBe(1)
  })
})
