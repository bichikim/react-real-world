import {createContext} from 'react'
import rosetta, {Rosetta} from 'rosetta'
import {createNamespace, NamespaceTranslator} from './namespace'

export interface Rosetta2 extends Rosetta<any> {
  __t?: any
  t: NamespaceTranslator
}

export const createRosetta = (): Rosetta2 => {
  const i18n = rosetta()
  return {
    ...i18n,
    __t: i18n.t,
    t: createNamespace(i18n.t),
  }
}

export const I18nContext = createContext<Rosetta2>(createRosetta())
