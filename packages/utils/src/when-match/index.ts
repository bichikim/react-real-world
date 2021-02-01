import {AnyFunction} from 'src/types'
import {whenTrue, WhenTrueOptionsHandy} from 'src/when-true'

export const whenMatch = <Y extends AnyFunction, N extends AnyFunction>(
  text: string,
  match: RegExp | undefined | null,
  options: WhenTrueOptionsHandy<Y, N>,
) => {
  return whenTrue(() => (match && match.test(text)), options)
}
