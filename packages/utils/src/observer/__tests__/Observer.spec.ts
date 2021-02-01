import {Observer} from 'src/observer'

describe('Observer', function test() {
  it('should observe it', function test() {
    const sub = jest.fn(() => null)
    const sub2 = jest.fn(() => null)
    const observer = new Observer<() => any>()
    observer.subscribe(sub)

    observer.fire((value) => value())

    expect(sub.mock.calls.length).toBe(1)

    observer.unsubscribe(sub)

    observer.fire((value) => value())

    expect(sub.mock.calls.length).toBe(1)

    sub.mockClear()

    observer.subscribeMany([sub, sub2])

    observer.fire((value) => value())

    expect(sub.mock.calls.length).toBe(1)
    expect(sub2.mock.calls.length).toBe(1)
  })
})
