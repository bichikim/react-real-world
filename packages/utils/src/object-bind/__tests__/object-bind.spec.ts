import {objectBind} from 'src/object-bind'

describe('object-bind', function test() {
  it('should ', function test() {
    const result = objectBind({
      getMe() {
        return this.myName
      },
      getMeGetMe() {
        return this.getMe()
      },
      get me() {
        return this.myName
      },
      set me(name: string) {
        this.myName = name
      },
      myName: 'bar',
    })
    expect(result.myName).toBe('bar')
    result.me = 'foo'
    expect(result.me).toBe('foo')
    expect(result.getMe()).toBe('foo')
    expect(result.getMeGetMe()).toBe('foo')
  })
})
