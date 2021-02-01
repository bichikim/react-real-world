/* istanbul ignore file */
// only types
/* eslint-disable no-magic-numbers */

export type EmptyObject = {
  // empty
}

export type TypedFunction<A extends Array<any>, R> = (...args: A) => R

export type ReturnFunction<R, A extends Array<any> = Array<any>> = (...args: A) => R

export type AnyFunction<A extends any[] = any[], R = any> = (...args: A) => R

export interface AnyObjectFunction<R = any, T = any, A extends Array<any> = any[]> extends AnyObject<T> {
  (...args: A): R
}

export type AnyObject<T = any> = Record<number | string | symbol, T>

export type PureObject<T = any> = Record<string, T>

export type ArrayAble<T> = T | T[]

export type PrevIndex<T extends number> = [
  -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
  27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
][T]

export type NextIndex<T extends number> = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
  27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
][T]

export type Next2Index<T extends number> = [
  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
  27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
][T]

export type Next3Index<T extends number> = [
  3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
  27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
][T]

export type Next4Index<T extends number> = [
  4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
  27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
][T]

export type NextCountIndex<T extends number, C extends number> = [
  T, NextIndex<T>, Next2Index<T>, Next3Index<T>,
  Next4Index<T>,
][C]

export type GetLength<original extends any[]> = original extends { length: infer L } ? L : never

export type GetLastIndex<original extends any[]> = PrevIndex<GetLength<original>>

export type PickRequired<T, K extends keyof T> = {
  [P in K]-?: T[P]
} & {
  [P in Exclude<keyof T, K>]: T[P]
}

export type DropParameters<T extends (...args: any) => any, S = any> =
  T extends (a: S, ...args: infer P) => any ? P : never;
