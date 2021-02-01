import {createIsEmail} from 'src/validators'

describe('is-email', function test() {
  it('should return true', function test() {
    const result = createIsEmail()('email@email.net')

    expect(result).toBe(true)
  })

  it('should return false', function test() {
    const result = createIsEmail()('email@e')

    expect(result).toBe(false)
  })
})
