import {CSSObject as _CSSObject, CssFunctionReturnType} from '@styled-system/css'
import {styleFn, Theme} from 'styled-system'

export type StyleFunction = styleFn

export type PossibleSystemItem = _CSSObject | styleFn

export type CSSObject = PossibleSystemItem

export type System =
  ReadonlyArray<PossibleSystemItem |
  ReadonlyArray<PossibleSystemItem>>

export type PropsWithTheme<P, T extends Theme = Theme> = P & {
  theme?: T
}

export interface SystemFunction<P, T extends Theme = Theme> {
  (props: PropsWithTheme<P, T>): _CSSObject | CssFunctionReturnType

  cache?: Record<string, any>
  config?: Record<string, any>
  propNames?: string[]
}
