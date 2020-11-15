import {forwardRefSym, memoSym} from './react-symbols'

export const getOriginalComponent = <T>(Component: T): T => {
  const mayComponent: any = Component
  if (mayComponent.$$typeof === memoSym) {
    return getOriginalComponent(mayComponent.type)
  }

  if (mayComponent.$$typeof === forwardRefSym) {
    return getOriginalComponent(mayComponent.render)
  }
  return mayComponent
}
