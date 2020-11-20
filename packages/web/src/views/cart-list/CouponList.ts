import {FC, createElement as h, useCallback} from 'react'
import {Box} from 'src/components/Box'
import {Coupon} from 'src/store/user'

export interface CouponListProps {
  list: ([string, Coupon])[]
  onChangeSelect?: (id: string, value: boolean) => any
  selectedCouponID?: string
}

export const CouponList: FC<CouponListProps> = (props) => {
  const {list, onChangeSelect, selectedCouponID} = props

  const handleSelect = useCallback((id, value) => () => {
    onChangeSelect?.(id, value)
  }, [onChangeSelect])

  return (
    h(Box, {bg: 'WhiteSmoke', p: 10},
      h(Box, {fontSize: 'md', p: 10}, 'coupons'),
      h(Box, {display: 'flex', width: '100%'},
        list.map(([key, item]) => {
          const {title, type, amount, id} = item

          const checked = selectedCouponID === id

          return (
            h(Box, {bg: 'black', key, p: 10},
              h(Box, {
                as: 'input',
                checked,
                color: 'white',
                onClick: handleSelect(id, !checked),
                size: '20px',
                type: 'checkbox',
              }),
              h(Box, {color: 'white'}, `${amount}${type === 'rate' ? '%' : '\\'}`),
              h(Box, {color: 'white'}, title),
            )
          )
        }),
      ),
    )
  )
}
