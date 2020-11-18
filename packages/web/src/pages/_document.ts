import Document, {DocumentProps, Html, Main, NextScript} from 'next/document'
import {Fragment, createElement as h} from 'react'
import {extractCritical} from '@emotion/server'
import * as middlewares from 'src/middlewares'
import {middleware as executeMiddleware} from 'src/middleware'

const marginPageProps = (props, pageProps = (props) => (props?.pageProps ?? {})) => {
  const _pageProps = pageProps(props)
  Object.assign(props['__NEXT_DATA__'].props.pageProps, _pageProps)
  return props['__NEXT_DATA__'].props.pageProps
}

export interface Props extends DocumentProps {
  pageProps: any
  styleTags: any
}

class CustomDocument extends Document<Props> {
  static async getInitialProps(context) {
    const initialProps = await Document.getInitialProps(context)
    const pageProps = await executeMiddleware(middlewares, context)

    const styles = extractCritical(initialProps.html)
    return {
      ...initialProps,
      pageProps,
      styles: (h(Fragment, null,
        initialProps.styles,
        h('style', {
          dangerouslySetInnerHTML: {__html: styles.css},
          'data-emotion-css': styles.ids.join(' '),
        }),
      )),
    }
  }

  render() {
    const pageProps = marginPageProps(this.props)

    const lang = pageProps?.language ?? 'ko'

    return (
      h(Html, {lang},
        h('body', null,
          h(Main),
          h(NextScript),
        ),
      )
    )
  }
}

export default CustomDocument
