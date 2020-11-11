import {act, renderHook} from '@testing-library/react-hooks'
import {useRefAct} from '..'

describe('useRefAct', function test() {
  it('should not return changed function', function test() {
    const onChange = jest.fn((v: any) => v)
    const {result, rerender} = renderHook(({onChange}) => useRefAct(onChange), {initialProps: {onChange: (v) => v}})

    const ref = result.current

    act(() => {
      rerender({onChange})
    })

    expect(result.current).toBe(ref)
    expect(result.current.current).toBe(onChange)

    act(() => {
      result.current.current('foo')
    })

    expect(onChange.mock.calls.length).toBe(1)
  })
})
