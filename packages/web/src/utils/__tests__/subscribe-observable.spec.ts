import {action} from 'mobx'
import {subscribeObservable} from '..'

describe('subscribe-observable', function test() {
  it('should subscribe observable state with init', function test() {
    const state = subscribeObservable({
      foo: 'foo',
    })({
      init: (state) => {
        state.foo = 'bar'
      },
    })

    expect(state).toEqual({foo: 'bar'})
  })
  it('should subscribe observable state with changed', function test() {
    let changed = {}
    const state = subscribeObservable({
      foo: 'foo',
    })({
      changed: (state) => (changed = {...state}),
    })

    const change = action((value: string) => {
      state.foo = value
    })

    change('bar')

    expect(changed).toEqual({
      foo: 'bar',
    })
  })
})
