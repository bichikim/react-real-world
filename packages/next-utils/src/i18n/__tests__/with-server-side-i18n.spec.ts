import {createContext} from 'src/__tests__/create-context-mock'
import {I18N_NAME, multiMessage, withServerSideI18n} from 'src/i18n'

describe('with-server-side-i18n', function test() {
  it('should provide i18n message page props', async function test() {
    const serversideProps = withServerSideI18n({
      ko: () => ({
        foo: '포',
      }),
    })()

    const result = await serversideProps(createContext())

    expect(result).toEqual({
      props: {
        [I18N_NAME]: {
          language: 'ko',
          message: {
            foo: '포',
          },
        },
      },
    })
  })

  it('should provide i18n message with array', async function test() {
    const serversideProps = withServerSideI18n({
      ko: () => ([
        {
          foo: '포',
        },
        {
          bar: '바',
        },
      ]),
    })()

    const result = await serversideProps(createContext())

    expect(result).toEqual({
      props: {
        [I18N_NAME]: {
          language: 'ko',
          message: {
            bar: '바',
            foo: '포',
          },
        },
      },
    })
  })

  it('should provide i18n message with multi promise object', async function test() {
    const serversideProps = withServerSideI18n({
      ko: multiMessage({
        bar: Promise.resolve('바'),
        foo: Promise.resolve('포'),
      }),
    })()

    const result = await serversideProps(createContext())

    expect(result).toEqual({
      props: {
        [I18N_NAME]: {
          language: 'ko',
          message: {
            bar: '바',
            foo: '포',
          },
        },
      },
    })
  })

  it('should provide i18n message with multi with promise esModule object', async function test() {
    const serversideProps = withServerSideI18n({
      ko: multiMessage({
        bar: Promise.resolve({default: '바'}),
        foo: Promise.resolve({default: '포'}),
      }),
    })()

    const result = await serversideProps(createContext())

    expect(result).toEqual({
      props: {
        [I18N_NAME]: {
          language: 'ko',
          message: {
            bar: '바',
            foo: '포',
          },
        },
      },
    })
  })
})
