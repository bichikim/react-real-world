import {beSize, beSizedArray, beSizedObject, beSizeString} from 'src/be-size'

describe('be-size', function test() {
  describe('be-size-object', function test() {
    it('should return size object', function test() {
      const result = beSizedObject({
        bar: 20,
        foo: 10,
      })

      expect(result).toEqual({
        bar: '20px',
        foo: '10px',
      })
    })
  })

  describe('be-size-array', function test() {
    it('should return size array', function test() {
      const result = beSizedArray([10, 20])

      expect(result).toEqual(['10px', '20px'])
    })
  })

  describe('be-size-string', function test() {
    it('should return size string', function test() {
      const result = beSizeString(10)

      expect(result).toBe('10px')
    })
  })

  describe('be-size', function test() {
    it('should return array size', function test() {
      const result = beSize([10, 20])

      expect(result).toEqual(['10px', '20px'])
    })

    it('should return object size', function test() {
      const result = beSize({bar: 20, foo: 10})

      expect(result).toEqual({
        bar: '20px',
        foo: '10px',
      })
    })

    it('should return string size', function test() {
      const result = beSize(10)

      expect(result).toBe('10px')
    })

    it('should return string with string', function test() {
      const result = beSize('10px')

      expect(result).toBe('10px')
    })

    it('should return symbol with symbol', function test() {
      const sym = Symbol('test')
      // @ts-ignore
      const result = beSize(sym)

      expect(result).toBe(sym)
    })
  })
})
