import {act, renderHook} from '@testing-library/react-hooks'
import {useInit} from '../init'

describe('use-init', function test() {
  it('should always return initValue', function test() {
    const init = ['foo']
    const {result, rerender} = renderHook(({init}) => useInit(init), {initialProps: {init}})
    expect(result.current).toBe(init)
    act(() => {
      rerender({init: ['bar']})
    })
    expect(result.current).toBe(init)
  })
})
