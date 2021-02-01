
interface GetSizeReturnType {
  operator?: string
  value: number
}

export const getSizeNumber = (data: string | number): GetSizeReturnType => {
  if (typeof data === 'number') {
    return {
      value: data,
    }
  }

  const value = Number.parseInt(data, 10)

  return {
    operator: data.replace(String(value), ''),
    value,
  }
}

/**
 * @deprecated
 */
export const getSize = getSizeNumber
