const HUNDRED = 100

export type DiscountLogicFactory = (discount: number, after?: AfterProcess) => (value: number) => number

export type DiscountLogic = (value: number) => number

type AfterProcess = (value: number) => number

export const amount: DiscountLogicFactory = (discount: number, after: AfterProcess = Math.floor) => (value: number) => {
  const result = after(value - discount)
  if (result <= 0) {
    return 0
  }
  return result
}

export const rate: DiscountLogicFactory = (discount: number, after: AfterProcess = Math.floor) => (value: number) => {
  return after(value * (1 - (discount / HUNDRED)))
}
