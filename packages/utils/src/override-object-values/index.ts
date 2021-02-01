export type OverrideRecipe<T, R> = (value: T, key: string) => R

export const overrideObjectValues = <T, R, K extends string>(
  target: Record<K, T>,
  recipe: OverrideRecipe<T, R>,
): Record<K, R> => {
  const empty = {}
  Object.keys(target).forEach((key) => {
    empty[key] = recipe(target[key], key)
  })

  return empty as any
}
