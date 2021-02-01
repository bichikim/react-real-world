import {bind} from 'lodash'

export const bindPropertyDescriptor = (descriptor, thisArg) => {
  const myDescriptor = {...descriptor}

  if (typeof myDescriptor.get === 'function') {
    bind(myDescriptor.get, thisArg)
  }

  if (typeof myDescriptor.set === 'function') {
    bind(myDescriptor.set, thisArg)
  }

  if (typeof myDescriptor.value === 'function') {
    bind(myDescriptor.value, thisArg)
  }

  return myDescriptor
}

export const objectBind = <T extends Record<string, any>>(target: T): T => {
  const descriptors = Object.getOwnPropertyDescriptors(target)
  const newObject = {}

  Object.keys(descriptors).forEach((key) => {
    Object.defineProperty(newObject, key, bindPropertyDescriptor(descriptors[key], newObject))
  })

  return newObject as T
}
