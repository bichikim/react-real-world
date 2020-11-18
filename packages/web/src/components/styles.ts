import {ResponsiveValue, system, Theme} from 'styled-system'
import {Property} from 'csstype'

export interface EventProps<T extends Theme = Theme> {
  cursor?: ResponsiveValue<Property.Cursor>
  pointerEvents?: ResponsiveValue<Property.PointerEvents, T>
}

export const event = system<EventProps>({
  cursor: {
    property: 'cursor',
  },
  pointerEvents: {
    property: 'pointerEvents',
  },
})
