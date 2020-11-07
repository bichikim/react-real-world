import {memoize} from '../memoize'

const setup = () => {
  const memoFunction = jest.fn((foo, bar) => {
    return [foo, bar]
  })
  const runMemoFunction = memoize(memoFunction)

  return {
    memoFunc: memoFunction,
    runMemoFunc: runMemoFunction,
  }
}

describe('memoize', function test() {
  it('should memo props', function test() {
    const {runMemoFunc, memoFunc} = setup()

    const result1 = runMemoFunc('foo', 'bar')
    const result2 = runMemoFunc('foo', 'bar')
    expect(memoFunc.mock.calls.length).toBe(1)
    const result3 = runMemoFunc('foo', 'john')
    expect(memoFunc.mock.calls.length).toBe(2)

    expect(result1).toBe(result2)
    expect(result2).not.toBe(result3)
  })
  it('should memo deep', function test() {
    const {runMemoFunc, memoFunc} = setup()

    const result1 = runMemoFunc(['bar', 'foo'], 'bar')
    const result2 = runMemoFunc(['bar', 'foo'], 'bar')
    expect(memoFunc.mock.calls.length).toBe(1)
    const result3 = runMemoFunc(['bar', 'john'], 'bar')
    expect(memoFunc.mock.calls.length).toBe(2)

    expect(result1).toBe(result2)
    expect(result3).not.toBe(result2)
  })
})
