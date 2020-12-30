import {useAction} from 'src/use-action'
import {act, renderHook} from '@testing-library/react-hooks'
import flushPromise from 'flush-promises'
import {Store} from 'src/Store'

const setup = () => {
  const store = new Store({
    foo: 'foo',
  })

  const mutate = store.mutate((draft, name: string) => {
    draft.foo = name
  })

  const action = store.action((name) => {
    mutate(name)
    return Promise.resolve()
  })

  const wrapper = renderHook(() => useAction(action))

  return {
    action,
    mutate,
    ...wrapper,
  }
}

describe('use-action', function test() {
  it('should return state & action', async function test() {
    const {result, action} = setup()

    act(() => {
      action('bar')
    })

    {
      const [state] = result.current
      expect(state).toBe('in-progress')
    }

    await flushPromise()

    {
      const [state] = result.current
      expect(state).toBe('done')
    }
  })
})
