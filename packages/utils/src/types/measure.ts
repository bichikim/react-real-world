/* istanbul ignore file */
// only types

export interface Size {
  height: number
  width: number
}

export interface Point {
  x: number
  y: number
}

export type FetchStatus = 'idle' | 'wait' | 'done' | 'error'
