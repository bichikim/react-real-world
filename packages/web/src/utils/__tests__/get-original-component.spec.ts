import {forwardRef, createElement as h, memo} from 'react'
import {getOriginalComponent} from '..'

describe('get-original-component', function test() {
  it('should get an original component', function test() {
    const foo: any = (_, ref) => (h('div', {ref}))
    const memoFoo = memo(foo)
    const memoMemoFoo = memo(memoFoo)
    const refFoo = forwardRef(foo)

    expect(getOriginalComponent(memoFoo)).toBe(foo)
    expect(getOriginalComponent(memoMemoFoo)).toBe(foo)
    expect(getOriginalComponent(refFoo)).toBe(foo)
  })
})
