import {ConfigStyle} from 'styled-system/index.d.ts'
import {PureObject, SystemFunction} from './types'

declare module 'styled-system' {
  export * from 'styled-system/index.d.ts'

  export type Config2<P extends string> = Record<P, ConfigStyle | boolean>

  export function system<P extends PureObject>(styleDefinitions: Config2<keyof P>): SystemFunction<P>
}
