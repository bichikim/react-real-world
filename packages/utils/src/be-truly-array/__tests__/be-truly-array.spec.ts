import {beTrulyArray} from 'src/be-truly-array'

describe('be-truly-array', function test() {
  it('should return array', function test() {
    const result = beTrulyArray([])
    expect(result).toEqual([])
  })

  it('should return array with undefined', function test() {
    // for testing
    // eslint-disable-next-line unicorn/no-useless-undefined
    const result = beTrulyArray(undefined)
    expect(result).toEqual([])
  })

  it('should return array with null', function test() {
    const result = beTrulyArray(null)
    expect(result).toEqual([])
  })

  it('should return array with array', function test() {
    const result = beTrulyArray(['foo'])

    expect(result).toEqual(['foo'])
  })

  it('should return with ', function test() {
    const result = beTrulyArray('foo')

    expect(result).toEqual(['foo'])
  })
})
