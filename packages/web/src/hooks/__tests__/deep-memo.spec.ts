import {act, renderHook} from '@testing-library/react-hooks'
import {useDeepMemo} from '..'

const setup = (props) => {
  const wrapper = renderHook((props) => useDeepMemo(() => ({foo: 'foo'}), props), {initialProps: props})

  return {
    ...wrapper,
  }
}

describe('deep-memo', function test() {
  it('should deep memo', function test() {
    const {result, rerender} = setup({
      bar: 'bar',
      foo: 'foo',
    })

    const first = result.current

    act(() => {
      rerender({
        bar: 'bar',
        foo: 'foo',
      })
    })

    expect(result.current).toBe(first)

    act(() => {
      rerender({
        bar: 'bar',
        foo: 'bar',
      })
    })

    expect(result.current).not.toBe(first)
  })
})
