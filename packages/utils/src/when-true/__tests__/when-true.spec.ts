import {whenTrue} from 'src/when-true'

describe('when-true', function test() {
  it('should call a callback function', function test() {
    const pass = jest.fn(() => null)
    const notPass = jest.fn(() => null)

    whenTrue('foo', {
      notPass,
      pass,
    })

    expect(pass.mock.calls.length).toBe(1)
    expect(notPass.mock.calls.length).toBe(0)
  })

  it('should not call a callback function', function test() {
    const pass = jest.fn(() => null)
    const notPass = jest.fn(() => null)

    whenTrue(null, {
      notPass,
      pass,
    })

    expect(pass.mock.calls.length).toBe(0)
    expect(notPass.mock.calls.length).toBe(1)
  })

  it('should not call a callback function', function test() {
    const pass = jest.fn(() => null)

    whenTrue(true, pass)

    expect(pass.mock.calls.length).toBe(1)
  })
})
