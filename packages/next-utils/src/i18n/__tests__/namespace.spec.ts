import rosetta from 'rosetta'
import {createNamespace} from '..'

describe('i18n namespace', function test() {
  describe('createNamespace', function test() {
    it('should create Namespace', function test() {
      const i18n = rosetta()
      i18n.locale('ko-KR')
      i18n.set('ko-KR', {
        bar: ['바'],
        f: {
          o: {
            o: '포',
          },
        },
        foo: '포',
      })
      const translator = createNamespace(i18n.t)

      expect(translator('foo')).toBe('포')
      expect(translator.add('f.o')('o')).toBe('포')
      expect(translator.raw('bar')).toEqual(['바'])
    })
  })
})
