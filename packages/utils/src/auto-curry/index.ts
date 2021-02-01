import {AnyObjectFunction, GetLastIndex, NextIndex, TypedFunction} from 'src/types'

export interface AutoCurryFriendly<A extends Array<any>, R> {
  (...args: A): R
  count: number
}

const getParameter = (mayParameterMaxCount: any, mayRunner?: AnyObjectFunction) => {
  if (typeof mayParameterMaxCount === 'function' && mayParameterMaxCount?.count) {
    return {
      parameterMaxCount: mayParameterMaxCount.count,
      runner: mayParameterMaxCount,
    }
  } else if (typeof mayParameterMaxCount === 'number' && typeof mayRunner === 'function') {
    return {
      parameterMaxCount: mayParameterMaxCount,
      runner: mayRunner,
    }
  }
  throw new Error('[withAutoCurry] wrong parameter')
}

type CurryFunction<A extends Array<any>, R, Index extends number> = Index extends GetLastIndex<A> ?
  ((arg: A[Index]) => R) : (arg: A[Index]) => CurryFunction<A, R, NextIndex<Index>>

export function autoCurry<A extends Array<any>, R>(
  runner: AutoCurryFriendly<A, R>,
): CurryFunction<A, R, 0>

export function autoCurry<A extends Array<any>, R>(
  parameterMaxCount: number,
  runner: TypedFunction<A, R>,
): CurryFunction<A, R, 0>

export function autoCurry<A extends Array<any>, R>(
  mayParameterMaxCount: any,
  mayRunner?: AnyObjectFunction): CurryFunction<A, R, 0> {
  const {runner, parameterMaxCount} = getParameter(mayParameterMaxCount, mayRunner)

  const parameters: any[] = []

  const addParameters: any = (arg) => {
    parameters.push(arg)
    if (parameters.length >= parameterMaxCount) {
      return runner(...parameters)
    }
    return addParameters
  }
  return addParameters
}

