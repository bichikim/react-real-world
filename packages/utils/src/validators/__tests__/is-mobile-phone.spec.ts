import {createIsMobilePhone} from 'src/validators'

describe('is-mobile-phone', function test() {
  it('should return true', function test() {
    const result = createIsMobilePhone({locale: 'ko-KR'})('01022224444')

    expect(result).toBe(true)
  })

  it('should return false', function test() {
    const result = createIsMobilePhone({locale: 'ko-KR'})('01033330')

    expect(result).toBe(false)
  })
})
