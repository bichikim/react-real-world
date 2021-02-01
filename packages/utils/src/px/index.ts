import {AnyObject} from 'src/types'
import {beSizedArray, beSizedObject, beSizeString} from 'src/be-size'

/**
 * number -> ${number}px
 * @param size
 * @private
 */
function _px(size: number): string
/**
 * number[] -> (${number}px)[]
 * @param sizes number values
 * @private
 */
function _px(sizes: number[]): string[]
function _px(sizes: number | number[]): string | string[]
function _px<T extends AnyObject<number>>(sizes: T): Record<keyof T, string>
function _px<T extends AnyObject<number>>(sizes: number[] | number | T): string[] | string | Record<keyof T, string>
function _px<T extends AnyObject<number>>(
  sizes: number[] | number | T,
): string[] | string | Record<keyof T, string> {
  if (Array.isArray(sizes)) {
    return beSizedArray(sizes, 'px')
  }
  if (typeof sizes === 'object') {
    return beSizedObject(sizes, 'px')
  }
  return beSizeString(sizes)
}

export const px = _px

export default px
