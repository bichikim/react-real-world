import {act, renderHook} from '@testing-library/react-hooks'
import {SinonFakeTimers, useFakeTimers} from 'sinon'
import {useDebounce} from 'src/hooks'

describe('use-debounce', function test() {

  let clock: SinonFakeTimers

  beforeEach(() => {
    clock = useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('should debounce', function test() {
    let value = ''
    const HookComponent = jest.fn(({onChange}) => useDebounce(onChange, 2000, {leading: false}))
    const {result} = renderHook(HookComponent, {initialProps: {onChange: (_v) => {
      value = _v
    }}})

    act(() => {
      const onChange = result.current
      onChange('foo')
    })

    act(() => {
      clock.tick(1000)
    })

    expect(value).toEqual('')

    act(() => {
      clock.tick(1000)
    })

    expect(value).toEqual('foo')
  })
})
