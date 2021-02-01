import {GetServerSidePropsContext, GetServerSidePropsResult} from 'next'
import {AnyObject} from 'src/utils'
import {defaultsDeep} from 'lodash'

export type GetServerSideProps<P extends AnyObject> =
  (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<P>>

export type GetServerSidePropsWithOption<P extends AnyObject, O> =
  (context: GetServerSidePropsContext, options: O) => Promise<GetServerSidePropsResult<P>>

/**
 * create HOF of withServerSideProp
 * @example
 * ```ts
 * const withMyServerSideProps = createWithNextPageProps(() => ({props: {}}))
 *
 * const anotherGetServerSideProps = () => ({props: {}})
 * export getServerSideProps = withMyServerSideProps({foo: 'foo})(anotherGetServerSideProps)
 * ```
 * @param pagePropsFunction generate pageProps function
 */
export const createWithServerSideProps = <P extends AnyObject, O>
(pagePropsFunction: GetServerSidePropsWithOption<P, O>) =>
  (options: O) =>
    <NP extends AnyObject>(nextPagePagesFunction?: GetServerSideProps<NP>) =>
      async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<AnyObject>> => {
        const result = await pagePropsFunction(context, options)
        const resultNext = nextPagePagesFunction ? await nextPagePagesFunction(context) : {}

        return defaultsDeep(resultNext, result)
      }
