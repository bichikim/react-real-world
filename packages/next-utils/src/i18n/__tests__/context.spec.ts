import {render} from '@testing-library/react'
import {createElement as h, useContext} from 'react'
import {createRosetta, I18nContext} from '..'

describe('i18n context', function test() {
  describe('createRosetta', function test() {
    it('should create namespace rosetta ', function test() {
      const {set, locale, __t, t} = createRosetta()
      locale('ko-KR')
      set('ko-KR', {
        bar: ['바'],
        f: {
          o: {
            o: '포오',
          },
        },
        foo: '포',
      })
      expect(t('foo')).toBe('포')
      expect(t.add('f.o')('o')).toBe('포오')
      expect(t.raw('bar')).toEqual(['바'])
      expect(__t('foo')).toBe('포')
    })
  })

  describe('I18nContext', function test() {
    it('should be an i18n context', function test() {
      const context = I18nContext

      const Component = () => {
        const i18n = useContext(context)
        return (
          h('div', null, i18n.t('foo'))
        )
      }

      const {container} = render(h(Component))

      expect(container.firstChild).toMatchSnapshot()
    })
  })
})
