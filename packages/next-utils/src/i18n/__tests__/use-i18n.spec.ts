import {renderHook} from '@testing-library/react-hooks'
import {useI18n} from 'src/i18n/use-i18n'
import {withPageI18n} from 'src/i18n/with-page-i18n'
import {I18N_NAME} from 'src/i18n/constants'

const setup = (namespace?: string) => {
  const Component = () => {
    return  useI18n(namespace)
  }

  const wrapper = renderHook(Component, {
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
    wrapper: withPageI18n(({children}) => (children)),
  })

  return {
    ...wrapper,
  }
}

describe('useI18n', function test() {
  it('should return i18n', function test() {
    const {result} = setup()

    const {t} = result.current

    expect(t('foo')).toBe('포')
    expect(t.add('f.o')('o')).toBe('포오')
    expect(t.raw('bar')).toEqual(['바'])
  })
})
