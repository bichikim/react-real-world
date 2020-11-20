import {ComponentType, createElement as h} from 'react'
import {PageFunctionComponent, PureObject} from 'src/types'

export const withLayout = (Layout: ComponentType<PureObject>) =>
  (Page: ComponentType<PureObject>): PageFunctionComponent =>
    (props) => {
      const {children, ...rest} = props
      return (
        h(Layout, {...rest},
          h(Page, {...rest}, children),
        )
      )
    }
