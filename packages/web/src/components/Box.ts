import styled from '@emotion/styled'
import {FC, createElement as h, useCallback} from 'react'
import {PureObject} from 'src/types'
import {useDebounce, withFastMemo} from 'src/hooks'
import {
  color,
  ColorProps,
  flexbox, FlexboxProps,
  grid,
  GridProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  ResponsiveValue,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  style,
  Theme,
  typography,
  TypographyProps,
} from 'styled-system'
import {createShouldForwardProp, props} from '@styled-system/should-forward-prop'
import {Property} from 'csstype'
import {event, EventProps} from './styles'

interface TransformProps<T extends Theme = Theme> {
  transform?: ResponsiveValue<string, T>
}

const transform = style({
  cssProperty: 'transform',
  prop: 'transform',
})

interface userSelectProps<T extends Theme = Theme> {
  userSelect?: ResponsiveValue<Property.UserSelect, T>
}

const userSelect = style({
  cssProperty: 'userSelect',
  prop: 'userSelect',
})

interface TextDecorationProps<T extends Theme = Theme> {
  textDecoration?: ResponsiveValue<Property.TextDecoration, T>
}

const textDecoration = style({
  cssProperty: 'textDecoration',
  prop: 'textDecoration',
})

const StyledBox: FC<PureObject> = styled('div', {
  shouldForwardProp: createShouldForwardProp([...props, 'transform', 'cursor', 'pointerEvents'])})(
  color, space, layout, position, shadow, flexbox, grid, typography, transform, event, textDecoration, userSelect,
)

export interface ASProps {
  as?: string
}

export interface HtmlProps {
  disabled?: boolean
  onClick?: () => any
  type?: string
}

export interface ImgProps {
  src?: string
  srcSet?: string
}

export interface HtmlInputProps<S = any> {
  checked?: boolean
  onChange?: (value: S) => any
  value?: S
}

export interface BoxProps<S = any> extends ColorProps, SpaceProps, LayoutProps, PositionProps, ShadowProps,
  FlexboxProps, GridProps, TypographyProps, HtmlInputProps<S>, HtmlProps, ASProps, ImgProps, TransformProps,
  EventProps, TextDecorationProps, userSelectProps {
}

const ASYNC_WAIT = 45

const useAsyncEvent = (onChange, getter?: (value: any) => any, wait:number = ASYNC_WAIT) => {
  return useDebounce(onChange, wait, {getter})
}

const useChange = (onChange, type) => {
  return useCallback((event) => {
    switch (type) {
      case 'checkbox':
        return onChange && onChange(event?.target?.checked)
      case 'radio':
        return onChange && onChange(event?.target?.checked)
      default:
        return onChange && onChange(event?.target?.value)
    }
  }, [onChange, type])
}

export const Box: FC<BoxProps> = withFastMemo((props) => {
  const {children, value = '', type, ...rest} = props

  const onClick = useAsyncEvent(props.onClick)
  const onChange = useChange(props.onChange, type)

  return (
    h(StyledBox, {...rest, onChange, onClick, type, value}, children)
  )
})
