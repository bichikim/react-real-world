import {stateSym} from './symbol'

export type SpecialKey = 'first' | 'last'

export type Wrap<A extends any[] = any[], R = any> =
  (function_: PipeFunction<A, R>, arg: any, index: number, specialKey?: SpecialKey) => PipeFunction<A, R>

export type Trap<R = any> = (result: R) => boolean

export type State = 'error' | 'success'

export type PipeFunction<A extends any[] = any[], R = any> = (...args: A) => R
export type AsyncPipeFunction<A extends any[] = any, R = any> = (...args: A) => Promise<R> | R

export interface Visitant {
  [stateSym]: State
  value: any
}

