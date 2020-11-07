import  {AppProps} from 'next/app'
import {Fragment, createElement as h} from 'react'
import {DefaultSeo} from 'next-seo'
import {ApolloProvider} from '@apollo/client'
import {client} from 'src/apollo'
import {EmptyObject} from 'src/types'
import {Favicon} from 'src/components/Favicon'
import {CommonHead} from 'src/components/CommonHead'

/**
 * custom App
 * @link https://nextjs.org/docs/advanced-features/custom-app
 * @param props
 * @constructor
 */
function MyApp(props: AppProps<EmptyObject>) {
  const {
    /**
     * a page component
     */
    Component,
    /**
     * pageProps in <body> -> <script id="__NEXT_DATA__" type="application/json">
     */
    pageProps,
  } = props

  return (
    h(Fragment, null,
      h(CommonHead),
      h(Favicon),
      h(DefaultSeo, {
        openGraph: {
          type: 'website',
        },
      }),
      h(ApolloProvider, {client},
        /**
         * a page component such as src/index/index.ts
         */
        h(Component, {...pageProps}),
      ),
    )
  )
}

export default MyApp
