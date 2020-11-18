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
  typography,
  TypographyProps,
} from 'styled-system'
import {createShouldForwardProp, props} from '@styled-system/should-forward-prop'

interface TransformProps {
  transform?: ResponsiveValue<string>
}

const transform = style({
  cssProperty: 'transform',
  prop: 'transform',
})

const StyledBox: FC<PureObject> = styled('div', {shouldForwardProp: createShouldForwardProp([...props, 'transform'])})(
  color, space, layout, position, shadow, flexbox, grid, typography, transform,
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
}

export interface HtmlInputProps<S = any> {
  checked?: boolean
  onChange?: (value: S) => any
  value?: S
}

export interface BoxProps<S = any> extends ColorProps, SpaceProps, LayoutProps, PositionProps, ShadowProps,
  FlexboxProps, GridProps, TypographyProps, HtmlInputProps<S>, HtmlProps, ASProps, ImgProps, TransformProps {
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
