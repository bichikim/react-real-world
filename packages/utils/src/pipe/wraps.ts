import {PipeFunction, Wrap} from './types'

export const createDeliverArg = () => {
  let _arg
  return (pipeFunction: PipeFunction) => (arg): any => {
    if (!_arg) {
      _arg = arg
    }
    return pipeFunction(_arg)
  }
}

export const deliverArgWrap: Wrap = (pipeFunction: PipeFunction, arg) => {
  return (): any => {
    return pipeFunction(arg)
  }
}
