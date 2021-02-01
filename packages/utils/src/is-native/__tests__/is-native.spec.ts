import {stub} from 'sinon'
import {isNative} from 'src/is-native'

describe('is-native', function test() {

  it('should be native', function test() {
    const stubHandle = stub(global.window.navigator, 'product').value('ReactNative')

    const result = isNative()

    expect(result).toBe(true)

    stubHandle.restore()
  })

  it('should not be native', function test() {

    const stubHandle = stub(global.window.navigator, 'product').value(null)

    const result = isNative()

    expect(result).toBe(false)

    stubHandle.restore()
  })
})
