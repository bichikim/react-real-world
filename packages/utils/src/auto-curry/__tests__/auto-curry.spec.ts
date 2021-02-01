import {autoCurry} from 'src/auto-curry'

const function_ = () => (foo: number, bar: string, john: string[]) => {
  return `${foo}, ${bar}, ${john.join(', ')}`
}

const curreyTest = (curryFunction) => {
  const step1 = curryFunction(1)

  expect(typeof step1 === 'function').toBe(true)

  const step2 = step1('foo')

  expect(typeof step2 === 'function').toBe(true)

  const result = step2(['john', '1'])

  expect(result).toBe('1, foo, john, 1')
}

describe('auto-curry', function test() {
  it('should return a curry function', function test() {
    const curryFunction = autoCurry(3, function_())

    curreyTest(curryFunction)
  })

  it('should return a curry function with an object function', function test() {

    const curryFunction = autoCurry(Object.assign(
      function_(),
      {
        count: 3,
      },
    ))

    curreyTest(curryFunction)
  })

  it('should throw an error with a normal function', function test() {

    // @ts-ignore
    const curryFunction = () => autoCurry(function_())

    expect(curryFunction).toThrow('[withAutoCurry] wrong parameter')
  })
})
