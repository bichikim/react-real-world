import {isSSR} from 'src/is-ssr'

describe('is-ssr', function test() {

  it('should be ssr', function test() {
    window.ssr = true

    const result = isSSR()

    expect(result).toBe(true)
  })

  it('should not be ssr', function test() {
    window.ssr = false

    const result = isSSR()

    expect(result).toBe(false)
  })
})
