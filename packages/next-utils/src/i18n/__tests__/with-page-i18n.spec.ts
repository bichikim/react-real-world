import {I18N_NAME, withPageI18n, withSubPageI18n} from 'src/i18n'

import {useI18n} from 'src/i18n/use-i18n'
import {renderHook} from '@testing-library/react-hooks'
import {createElement as h} from 'react'

const setup = (wrapper) => {
  const Component = () => {
    return  useI18n()
  }

  const _wrapper = renderHook(Component, {
    initialProps: {
      [I18N_NAME]: {
        language: 'ko-KR',
        message: {
          bar: ['바'],
          f: {
            o: {
              o: '포오',
            },
          },
          foo: '포',
        },
      },
    },
    wrapper,
  })

  return {
    ..._wrapper,
  }
}

describe('with-page-i18n', function test() {
  it('should provide i18n', function test() {
    const {result} = setup(withPageI18n(({children}) => (children)))

    const {t} = result.current

    expect(t('foo')).toBe('포')
    expect(t.add('f.o')('o')).toBe('포오')
    expect(t.raw('bar')).toEqual(['바'])
  })

  it('should provide i18n with namespace', function test() {
    const Component = withSubPageI18n('f.o')(({children}) => {
      return children
    })

    const {result} = setup(withPageI18n(({children}) => {
      return (
        h(Component, null, children)
      )
    }))

    expect(result.current.t('o')).toBe('포오')
  })
})

