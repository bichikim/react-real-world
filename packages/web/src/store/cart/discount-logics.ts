const HUNDRED = 100
export type DiscountLogicFactory = (discount: number) => (value: number) => number
export type DiscountLogic = (value: number) => number
export const amount: DiscountLogicFactory = (discount: number) => (value: number) => {
  const result = value - discount
  if (result <= 0) {
    return 0
  }
  return result
}

export const rate: DiscountLogicFactory = (discount: number) => (value: number) => {
  return value * (discount / HUNDRED)
}
