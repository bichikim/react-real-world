import Document, {DocumentProps, Head, Html, Main, NextScript} from 'next/document'
import {Fragment, createElement as h} from 'react'
import {extractCritical} from 'emotion-server'

export interface Props extends DocumentProps {
  pageProps: any
  styleTags: any
}

class CustomDocument extends Document<Props> {
  static async getInitialProps(context) {
    const initialProps = await Document.getInitialProps(context)
    const styles = extractCritical(initialProps.html)
    return {
      ...initialProps,
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
    return (
      h(Html, {lang: 'ko'},
        h(Head),
        h('body', null,
          h(Main),
          h(NextScript),
        ),
      )
    )
  }
}

export default CustomDocument
