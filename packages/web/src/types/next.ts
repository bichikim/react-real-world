import {FC} from 'react'
import {NextPageContext} from 'next'
import {PureObject} from 'src/types'
export type PageFunctionComponent<P = PureObject> = FC<P> & {
  getInitialProps?: (context: NextPageContext) => any
}
