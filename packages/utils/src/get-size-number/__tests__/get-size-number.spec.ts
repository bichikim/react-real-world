import {getSizeNumber} from 'src/get-size-number'

describe('get-size-number', function test() {
  it('should return value & operator with px', function test() {
    const result = getSizeNumber('5px')
    expect(result).toEqual({
      operator: 'px',
      value: 5,
    })
  })

  it('should return value & operator with em', function test() {
    const result = getSizeNumber('5em')
    expect(result).toEqual({
      operator: 'em',
      value: 5,
    })
  })

  it('should return value & operator with rem', function test() {
    const result = getSizeNumber('5rem')
    expect(result).toEqual({
      operator: 'rem',
      value: 5,
    })
  })

  it('should return value with a number', function test() {
    const result = getSizeNumber(1)

    expect(result).toEqual({
      value: 1,
    })
  })
})
