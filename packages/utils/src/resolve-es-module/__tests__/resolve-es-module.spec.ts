import {resolveEsModule} from '../index'

describe('resolve-es-module', function test() {
  it('should return es default value', function test() {
    const result = resolveEsModule({default: 'foo'})

    expect(result).toBe('foo')
  })

  it('should return none es value', function test() {
    const result = resolveEsModule('foo')

    expect(result).toBe('foo')
  })
})
