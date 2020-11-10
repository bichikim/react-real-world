export interface IdItem extends Record<string, any> {
  id?: string
}

export const createMaxAddItem = (max: number) => <S extends IdItem>(list: Map<string, S>) =>
  (id: string, item: S): boolean => {
    if (list.size < max) {
      createAddItem(list)(id, item)
      return true
    }
    return false
  }

export const createAddItem = <S extends IdItem>(list: Map<string, S>) => (id: string, item: S) => {
  list.set(id, item)
}

type ItemSet<S extends IdItem> = [string, S]

export const createMaxAddItems = (max: number) => <S extends IdItem>(list: Map<string, S>) => {
  const addMaxItem = createMaxAddItem(max)(list)
  return (items: ItemSet<S>[]) => {
    items.find(([id, item]) => {
      const result = addMaxItem(id, item)
      return !result
    })
  }
}

export const createAddItems = <S extends IdItem>(list: Map<string, S>) => {
  const addItem = createAddItem<S>(list)
  return (items: ItemSet<S>[]) => {
    items.forEach(([id, item]) => {
      addItem(id, item)
    })
  }
}

export const createRemoveItem = <S extends IdItem>(list: Map<string, S>) => (id: string) => {
  list.delete(id)
}

export const createGetItem = <S extends IdItem>(list: Map<string, S>) => (id: string) => {
  return list.get(id)
}

interface WithReturn<T extends IdItem, S extends IdItem> {
  additionalItem: T
  item: S
}

export const createGetWith = <T extends IdItem>(withList: Map<string, T>) => <S extends IdItem>(list: Map<string, S>) =>
  (getId: (item: S) => string) => (id: string): WithReturn<T, S> => {
    const item = list.get(id)

    return {
      additionalItem: withList.get(getId(item)),
      item: item,
    }
  }
