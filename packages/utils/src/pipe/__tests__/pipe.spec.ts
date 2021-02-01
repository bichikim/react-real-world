import {asyncPipe, createAsyncPipe, createPipe, nilTrap, nullTrap, pipe, undefinedTrap} from 'src/pipe'

const setupTrap = (trap, pipes: any[]) => {
  const lastFunction = jest.fn((a) => (a + 1))
  const passingFunction = jest.fn(() => 1)

  const result = createPipe({trap: trap})(
    pipes[0],
    passingFunction,
    pipes[1],
    lastFunction,
  )(0)

  return {
    lastFunction,
    passingFunction,
    result,
  }
}

describe('pipe', function test() {
  describe('pipe', function test() {
    it('should pipe functions', function test() {
      const result = pipe(
        (a) => (a + 1),
        (a) => (a + 1),
      )(0)

      expect(result).toBe(2)
    })
  })

  describe('pipeTrap', function test() {
    it('should end pipe functions with undefinedTrap', function test() {
      const {passingFunction, lastFunction, result} = setupTrap(undefinedTrap, [
        () => null,
        () => undefined,
      ])

      expect(passingFunction.mock.calls.length).toBe(1)
      expect(lastFunction.mock.calls.length).toBe(0)
      expect(result).toBe(undefined)
    })

    it('should end pipe functions with nullTrap', function test() {
      const {passingFunction, lastFunction, result} = setupTrap(nullTrap, [
        () => undefined,
        () => null,
      ])

      expect(passingFunction.mock.calls.length).toBe(1)
      expect(lastFunction.mock.calls.length).toBe(0)
      expect(result).toBe(null)
    })

    it('should end pipe functions with nilTrap', function test() {
      {
        const {passingFunction, lastFunction, result} = setupTrap(nilTrap, [
          () => undefined,
          () => null,
        ])

        expect(passingFunction.mock.calls.length).toBe(0)
        expect(lastFunction.mock.calls.length).toBe(0)
        expect(result).toBe(undefined)
      }
      {
        const {passingFunction, lastFunction, result} = setupTrap(nilTrap, [
          () => null,
          () => undefined,
        ])

        expect(passingFunction.mock.calls.length).toBe(0)
        expect(lastFunction.mock.calls.length).toBe(0)
        expect(result).toBe(null)
      }
    })
  })

  describe('pipeAsync', function test() {
    it('should pipe functions', async function test() {
      const result = await asyncPipe(
        (a) => (a + 1),
        (a) => (a + 1),
      )(0)

      expect(result).toBe(2)
    })

    it('should pipe async function', async function test() {
      const result = await asyncPipe(
        (a) => {
          return a + 1
        },
        (a) => {
          return Promise.resolve(a + 1)
        },
      )(0)

      expect(result).toBe(2)
    })
  })

  describe('pipeAsyncTrap', function test() {
    it('should pipe async function with trap', async function test() {
      const lastFunction = jest.fn((a) => {
        return Promise.resolve(a + 1)
      })
      const result = await createAsyncPipe({trap: nullTrap})(
        (a) => {
          return Promise.resolve(a + 1)
        },
        () => {
          return Promise.resolve(null)
        },
        lastFunction,
      )(0)

      expect(lastFunction.mock.calls.length).toBe(0)
      expect(result).toBe(null)
    })
  })
})
