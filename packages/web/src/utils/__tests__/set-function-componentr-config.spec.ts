import {FC, createElement as h, memo} from 'react'
import {setFunctionComponentConfig} from '..'

describe('set-function-component-config', function test() {
  it('should ', function test() {
    const foo: FC = () => (h('div'))

    const memoFoo = memo(foo)

    setFunctionComponentConfig(memoFoo, {
      displayName: 'bar',
    })

    expect(foo.displayName).toBe('bar')
  })
})
