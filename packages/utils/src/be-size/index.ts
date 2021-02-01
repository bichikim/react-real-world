import {AnyObject} from 'src/types'
import {collectionMap} from 'src/collection-map'

export type SizeTypes = 'px' | string

/**
 * number -> ${number}${sizeType}
 * @param size number values
 * @param type size type name
 */
export const beSizeString = (size: number, type: SizeTypes = 'px') => {
  return `${size}${type}`
}

/**
 * number[] -> (${number}${sizeType})[]
 * @param sizes number values
 * @param type size type name
 */
export const beSizedArray = (sizes: number[], type: SizeTypes = 'px') => {
  return sizes.map((value) => {
    return beSizeString(value, type)
  })
}

export const beSizedObject = (
  sizes: AnyObject<number>,
  type: string = 'px',
): AnyObject<string> => {

  return collectionMap(sizes, (value) => {
    return beSizeString(value, type)
  })
}

export function beSize(sizes: AnyObject<number>, type?: SizeTypes): AnyObject<string>
export function beSize(sizes: number[], type?: SizeTypes): string[]
export function beSize(sizes: string, type?: SizeTypes): string
export function beSize(sizes: number, type?: SizeTypes): string
export function beSize(sizes: any, type: string = 'px'): any {

  if (typeof sizes === 'string') {
    return sizes
  }

  if (Array.isArray(sizes)) {
    return beSizedArray(sizes, type)
  }

  if (typeof sizes === 'number') {
    return beSizeString(sizes, type)
  }

  if (typeof sizes === 'object') {
    return beSizedObject(sizes, type)
  }

  return sizes
}
