import {ApolloProvider} from '@apollo/client'
import {enableMapSet} from 'immer'
import {DefaultSeo} from 'next-seo'
import {AppProps} from 'next/app'
import {Fragment, createElement as h} from 'react'
import {client} from 'src/apollo'
import {CommonHead} from 'src/components/CommonHead'
import {Favicon} from 'src/components/Favicon'
import {EmptyObject} from 'src/types'
import {UI} from 'src/ui'

enableMapSet()

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

  const nonce = props.pageProps?.csp?.nonce

  return (
    h(Fragment, null,
      h(CommonHead),
      h(Favicon),
      h(DefaultSeo, {
        openGraph: {
          type: 'website',
        },
      }),
      h(UI, {nonce},
        h(ApolloProvider, {client},
          /**
           * a page component such as src/index/index.ts
           */
          h(Component, {...pageProps}),
        ),
      ),
    )
  )
}

export default MyApp
