import {act, fireEvent, render} from '@testing-library/react'
import {createElement as h} from 'react'
import {SinonFakeTimers, useFakeTimers} from 'sinon'
import {Box} from '../Box'

const TEN = 10
const BG = 'blue'

const setup = () => {
  const onClick = jest.fn(() => {
    return null
  })
  const wrapper = render(h(Box, {
    bg: BG, boxShadow: '0 0 0 1ex black',
    display: 'grid', gridTemplateColumns: '200px, 400px, 200px',
    m: TEN, onClick, p: TEN,
    position: 'absolute', size: TEN,
  }))

  return {
    ...wrapper,
    onClick,
  }
}

describe('Box', function test() {

  let clock: SinonFakeTimers

  beforeEach(() => {
    clock = useFakeTimers()
  })

  afterEach(() => {
    clock.restore()
  })

  it('should render it', function test() {
    const {container} = setup()
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should call onClick asynchronously', function test() {
    const {container, onClick} = setup()

    act(() => {
      fireEvent.click(container.firstChild)
    })

    expect(onClick.mock.calls.length).toBe(0)

    act(() => {
      clock.tick(50)
    })

    expect(onClick.mock.calls.length).toBe(1)
  })
})
