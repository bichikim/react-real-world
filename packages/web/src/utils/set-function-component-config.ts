import {FC, ValidationMap, WeakValidationMap} from 'react'
import {EmptyObject, PureObject} from 'src/types'
import {getOriginalComponent} from './get-original-component'

interface FunctionComponentConfig<P = EmptyObject> {
  contextTypes?: ValidationMap<any>
  defaultProps?: Partial<P>
  displayName?: string
  propTypes?: WeakValidationMap<P>
}

/**
 * resolve changing memo component config not working
 * @param Component
 * @param config
 */
export const setFunctionComponentConfig = <P extends PureObject>(
  Component: FC<P>,
  config: FunctionComponentConfig<P>,
) => {
  const render = getOriginalComponent(Component)

  Object.assign(render, config)
}
