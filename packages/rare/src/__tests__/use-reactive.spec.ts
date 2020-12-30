import {useReactive} from 'src/use-reactive'
import {renderHook} from '@testing-library/react-hooks'
import {Store} from 'src/Store'

const setup = (initState?) => {
  const store = new Store({
    foo: 'foo',
  })
  const wrapper = renderHook(() => useReactive(store, initState))

  return {
    ...wrapper,
  }
}

describe('use-reactive', function test() {
  it('should return a reactive hook', function test() {
    const {result} = setup()

    {
      const [state, dispatch] = result.current

      expect(state.foo).toBe('foo')

      dispatch((draft) => {
        draft.foo = 'bar'
      })
    }

    {
      const [state] = result.current

      expect(state.foo).toBe('bar')
    }
  })

  it('should return a reactive hook with initState', function test() {
    const {result} = setup({foo: 'bar'})

    expect(result.current[0].foo).toBe('bar')
  })
})
