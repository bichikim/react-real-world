import {FC, memo} from 'react'
import isEqual from 'react-fast-compare'
import {PureObject} from 'src/types'

export const withFastMemo = <P extends PureObject>(Component: FC<P>): FC<P> => {
  return memo(Component, isEqual) as any
}
