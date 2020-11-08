import styled from '@emotion/styled'
import {FC, createElement as h, useCallback} from 'react'
import {PureObject} from 'src/types'
import {useDebounce, withFastMemo} from 'src/hooks'
import {
  color,
  ColorProps,
  flexbox,
  FlexProps,
  grid,
  GridProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from 'styled-system'

const StyledBox: FC<PureObject> = styled('div')(
  color, space, layout, position, shadow, flexbox, grid, typography,
)

export interface ASProps {
  as?: string
}

export interface HtmlProps {
  disabled?: boolean
  onClick?: () => any
}

export interface HtmlInputProps<S = any> {
  checked?: boolean
  onChange?: (value: S) => any
  value?: S
}

export interface BoxProps<S = any> extends ColorProps, SpaceProps, LayoutProps, PositionProps, ShadowProps,
  FlexProps, GridProps, TypographyProps, HtmlInputProps<S>, HtmlProps, ASProps {
}

const ASYNC_WAIT = 45

const useAsyncEvent = (onChange, getter?: (value: any) => any, wait:number = ASYNC_WAIT) => {
  return useDebounce(onChange, wait, {getter})
}

const useChange = (onChange) => {
  return useCallback((event) => {
    onChange && onChange(event?.target?.value)
  }, [onChange])
}

export const Box: FC<BoxProps> = withFastMemo((props) => {
  const {children, value = '', ...rest} = props

  const onClick = useAsyncEvent(props.onClick)
  const onChange = useChange(props.onChange)

  return (
    h(StyledBox, {...rest, onChange, onClick, value}, children)
  )
})
