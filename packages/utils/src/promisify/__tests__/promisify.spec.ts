import {promisify} from 'src/promisify'

describe('promisify', function test() {
  it('should mack a callback function async function', async function test() {
    const function_ = promisify((value, callback) => {
      setTimeout(() => callback(null, value))
    })

    const result = await function_('foo')

    expect(result).toBe('foo')
  })

  it('should mack a callback function an async function with many arguments', async function test() {
    const function_ = promisify((value, value2, callback) => {
      setTimeout(() => callback(null, [value, value2]))
    })

    const result = await function_('foo', 'bar')

    expect(result).toEqual(['foo', 'bar'])
  })

  it('should mack a callback function an async function with error', async function test() {
    const function_ = promisify((value, value2, callback) => {
      setTimeout(() => callback('foo'))
    })

    try {
      await function_('foo', 'bar')
      expect('should be throw error').toBe('')
    } catch (error) {
      expect(error).toBe('foo')
    }
  })
})
