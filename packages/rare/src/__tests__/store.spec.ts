import {Store} from 'src/Store'
import flushPromise from 'flush-promises'

const setupTest = () => {
  const dispatcher1 = jest.fn(() => null)
  const dispatcher2 = jest.fn(() => null)
  const actionDispatcher1 = jest.fn(() => null)
  const actionDispatcher2 = jest.fn(() => null)
  const store = new Store({
    foo: 'foo',
  })

  return {
    actionDispatcher1,
    actionDispatcher2,
    dispatcher1,
    dispatcher2,
    store,
  }
}

describe('store', function test() {
  it('should change state and call dispatchers with a new state', function test() {
    const {store, dispatcher2, dispatcher1, actionDispatcher1} = setupTest()

    store.registerDispatcher(dispatcher1)
    store.registerDispatcher(dispatcher2)

    const myMutate = store.mutate((draft, name: string) => {
      draft.foo = name
    })

    const myAction = store.action((name: string) => {
      myMutate(name)
    })

    myAction.subscribe(actionDispatcher1)

    const myGetter = store.getter((state) => (state.foo))

    // >> start testing

    expect(myGetter()).toBe('foo')
    expect(dispatcher1.mock.calls.length).toBe(0)
    expect(dispatcher2.mock.calls.length).toBe(0)

    // do an action
    myAction('bar')

    expect(myGetter()).toBe('bar')
    expect(dispatcher1.mock.calls.length).toBe(1)
    expect(dispatcher1.mock.calls[0]).toEqual([{foo: 'bar'}])
    expect(dispatcher2.mock.calls.length).toBe(1)
    expect(dispatcher2.mock.calls[0]).toEqual([{foo: 'bar'}])
    expect(actionDispatcher1.mock.calls.length).toBe(2)
    expect(actionDispatcher1.mock.calls[0]).toEqual(['in-progress'])
    expect(actionDispatcher1.mock.calls[1]).toEqual(['done'])

    // clear mocking log
    dispatcher1.mockClear()
    dispatcher2.mockClear()

    // un register
    store.unRegisterDispatcher(dispatcher2)

    myMutate('john')

    expect(dispatcher1.mock.calls.length).toBe(1)
    expect(dispatcher1.mock.calls[0]).toEqual([{foo: 'john'}])
    expect(dispatcher2.mock.calls.length).toBe(0)
  })

  it('should change state and call dispatchers with a new state in async way', async function test() {
    const {store, actionDispatcher1, dispatcher1, dispatcher2} = setupTest()

    store.registerDispatcher(dispatcher1)
    store.registerDispatcher(dispatcher2)

    const myMutate = store.mutate((draft, name: string) => {
      draft.foo = name
      return Promise.resolve()
    })

    const myAction = store.action(async (name: string) => {
      await Promise.resolve()

      return myMutate(name)
    })

    myAction.subscribe(actionDispatcher1)

    // >> start testing

    myAction('bar')

    expect(store.state.foo).toBe('foo')
    expect(actionDispatcher1.mock.calls.length).toBe(1)
    expect(actionDispatcher1.mock.calls[0]).toEqual(['in-progress'])

    await flushPromise()

    expect(store.state.foo).toBe('bar')
    expect(actionDispatcher1.mock.calls.length).toBe(2)
    expect(actionDispatcher1.mock.calls[1]).toEqual(['done'])

    dispatcher1.mockClear()
    dispatcher2.mockClear()
    actionDispatcher1.mockClear()

    myAction.unsubscribe(actionDispatcher1)

    await myAction('john')

    expect(store.state.foo).toBe('john')
    expect(actionDispatcher1.mock.calls.length).toBe(0)
  })

  it('should not change state and call dispatchers with a new state in async way', async function test() {
    const {store, actionDispatcher1, dispatcher1, dispatcher2} = setupTest()

    store.registerDispatcher(dispatcher1)
    store.registerDispatcher(dispatcher2)

    const myMutate = store.mutate((draft, name: string) => {
      draft.foo = name
      return Promise.reject()
    })

    const myAction = store.action(async (name: string) => {
      await Promise.reject('foo-error')

      return myMutate(name)
    })

    myAction.subscribe(actionDispatcher1)

    // >> start testing

    myAction('bar')

    expect(actionDispatcher1.mock.calls.length).toBe(1)
    expect(store.state.foo).toBe('foo')
    expect(dispatcher1.mock.calls.length).toBe(0)
    expect(dispatcher2.mock.calls.length).toBe(0)
    expect(actionDispatcher1.mock.calls[0]).toEqual(['in-progress'])

    await flushPromise()

    expect(actionDispatcher1.mock.calls.length).toBe(2)
    expect(actionDispatcher1.mock.calls[1]).toEqual(['error', 'foo-error'])
    expect(store.state.foo).toBe('foo')

    const testMutate = () => myMutate('bar')

    await expect(testMutate).rejects.toBe(undefined)

    expect(store.state.foo).toBe('foo')
  })
})
