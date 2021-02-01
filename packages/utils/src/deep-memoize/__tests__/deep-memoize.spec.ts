import {deepMemoize} from 'src/deep-memoize'

describe('deep-memoize', function test() {
  it('should memo', function test() {
    const function_ = jest.fn((foo) => foo)
    const memoFunction = deepMemoize(function_)

    expect(function_.mock.calls.length).toBe(0)

    {
      const result = memoFunction('foo')

      expect(result).toBe('foo')
      expect(function_.mock.calls.length).toBe(1)
    }

    {
      const result = memoFunction('foo')

      expect(result).toBe('foo')
      expect(function_.mock.calls.length).toBe(1)
    }

    {
      const result = memoFunction('bar')

      expect(result).toBe('bar')
      expect(function_.mock.calls.length).toBe(2)
    }

  })

  it('should memo with object props', function test() {
    const function_ = jest.fn((foo) => foo)
    const memoFunction = deepMemoize(function_, {maxSize: 2})

    expect(function_.mock.calls.length).toBe(0)
    {
      const result = memoFunction({foo: 'foo'})

      expect(result).toEqual({
        foo: 'foo',
      })

      expect(function_.mock.calls.length).toBe(1)
    }

    {
      const result = memoFunction({foo: 'foo'})

      expect(result).toEqual({
        foo: 'foo',
      })

      expect(function_.mock.calls.length).toBe(1)

    }

    {
      const result = memoFunction({foo: 'foo1'})

      expect(result).toEqual({
        foo: 'foo1',
      })

      expect(function_.mock.calls.length).toBe(2)
    }

    {
      const result = memoFunction({foo: 'foo'})

      expect(result).toEqual({
        foo: 'foo',
      })

      expect(function_.mock.calls.length).toBe(2)
    }
  })
})
