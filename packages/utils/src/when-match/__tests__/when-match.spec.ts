import {whenMatch} from 'src/when-match'

describe('when-match', function test() {
  it('should run the pass', function test() {
    const pass = jest.fn(() => null)
    const notPass = jest.fn(() => null)

    whenMatch('foo', /^foo/, {
      notPass,
      pass,
    })

    expect(pass.mock.calls.length).toBe(1)
    expect(notPass.mock.calls.length).toBe(0)
  })

  it('should run the not-pass', function test() {
    const pass = jest.fn(() => null)
    const notPass = jest.fn(() => null)

    whenMatch('bar', /^foo/, {
      notPass,
      pass,
    })

    expect(pass.mock.calls.length).toBe(0)
    expect(notPass.mock.calls.length).toBe(1)
  })
})
