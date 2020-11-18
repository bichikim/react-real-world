import Document, {DocumentProps, Head, Html, Main, NextScript} from 'next/document'
import {createElement as h} from 'react'
import {UIDocument} from 'src/ui'

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

    return {
      ...initialProps,
    }
  }

  render() {
    const pageProps = marginPageProps(this.props)

    const lang = pageProps?.language ?? 'ko'

    const nonce = pageProps?.csp?.nonce

    return (
      h(Html, {lang},
        h(Head, {nonce}),
        h('body', null,
          h(UIDocument, {nonce},
            h(Main),
          ),
        ),
        h(NextScript),
      )
    )
  }
}

export default CustomDocument
