import {act, fireEvent, render} from '@testing-library/react'
import {FC, createElement as h, useState} from 'react'
import {withFastMemo} from 'src/hooks'

const setup = () => {
  const Foo = jest.fn((props) => {
    return h('div', null, props.children)
  })
  const MemoFoo: FC = withFastMemo(Foo)
  const Bar = jest.fn((props) => {
    return h('div', null, props.children)
  })
  const MemoBar: FC = withFastMemo(Bar)

  const Container: FC = () => {
    const [count, setCount] = useState(0)
    return (
      h('div', null,
        h(MemoFoo, null,
          h(MemoBar, null, 'foo'),
        ),
        h('a', {onClick: () => setCount(count + 1)}, 'add'),
        h('div', null, count),
      )
    )
  }

  const wrapper = render(h(Container))

  return {
    ...wrapper,
    Bar,
    Foo,
  }
}

describe('fast-memo', function test() {
  it('should not rerender', function test() {
    const {container, Foo, Bar} = setup()

    expect(Foo.mock.calls.length).toBe(1)
    expect(Bar.mock.calls.length).toBe(1)
    expect(container.firstChild).toMatchSnapshot()

    act(() => {
      const button = container.querySelector('a')
      if (button) {
        fireEvent.click(button)
      }
    })

    expect(Foo.mock.calls.length).toBe(1)
    expect(Bar.mock.calls.length).toBe(1)
    expect(container.firstChild).toMatchSnapshot()
  })
})
