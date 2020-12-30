import {isSSR} from 'src/is-ssr'

describe('is-ssr', function test() {

  let windowSpy

  it('should return true', function test() {
    const result = isSSR()
    expect(result).toBe(false)
  })

  it('should return false', function test() {
    windowSpy = jest.spyOn(window, 'window', 'get')
    // eslint-disable-next-line unicorn/no-useless-undefined
    windowSpy.mockImplementation(() => undefined)
    const result = isSSR()
    expect(result).toBe(true)
    windowSpy.mockRestore()
  })
})
