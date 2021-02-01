import {AsyncPipeFunction, PipeFunction, Trap, Wrap} from './types'
import {createExecute, PipeTrapExit} from './utils'

const syncLoop = (functions: PipeFunction[], arg: any, execute: ReturnType<typeof createExecute>) => {
  let value = arg
  for (const [index, function_] of functions.entries()) {
    try {
      value = execute(function_, index)(value)
    } catch (error) {
      if (error instanceof PipeTrapExit) {
        return error.value
      }
    }
  }

  return value
}

const asyncLoop = (functions: PipeFunction[], arg: any, execute: ReturnType<typeof createExecute>) => {
  return functions.reduce((promise, function_: AsyncPipeFunction, index) => {
    return promise.then(execute(function_, index))
  }, Promise.resolve(arg))
    .catch((error) => {
      if (error instanceof PipeTrapExit) {
        return error.value
      }
      throw error
    })
}

interface PipeOptions {
  trap?: null | Trap
  wrap?: null | Wrap
}

export const createAsyncPipe = ({trap = null, wrap = null}: PipeOptions) =>
  (...functions: AsyncPipeFunction[]) =>
    (arg: any = null) => asyncLoop(functions, arg, createExecute(trap, wrap, arg))

export const asyncPipe = (...functions: AsyncPipeFunction[]) => (arg: any | null) =>
  (asyncLoop(functions, arg, createExecute(null, null, arg)))

export const createPipe = ({trap = null, wrap = null}: PipeOptions) =>
  (...functions: PipeFunction[]) =>
    (arg: any = null) =>
      syncLoop(functions, arg, createExecute(trap, wrap, arg))

export const pipe = (...functions: PipeFunction[]) => (arg: any | null) =>
  (syncLoop(functions, arg, createExecute(null, null, arg)))
