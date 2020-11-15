import {createElement, forwardRef, memo} from 'react'

export const memoSym = memo((props) => createElement('div', props)).$$typeof

export const forwardRefSym = forwardRef((props, ref) => createElement('div', {...props, ref})).$$typeof

export const elementSym = (createElement((props) => createElement('div', props)) as any).$$typeof
