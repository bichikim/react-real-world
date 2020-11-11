export interface IdItem extends Record<string, any> {
  id?: string
}

export type IDGetter<S extends IdItem> = (item: S) => string

export const createMaxAddItem = (max: number) =>
  <S extends IdItem>(list: Map<string, S>) =>
    (noId?: IDGetter<S>) => {
      const addItem = createAddItem(list)(noId)
      return (item: S): boolean => {
        if (list.size < max) {
          addItem(item)
          return false
        }
        return true
      }
    }


export const createAddItem = <S extends IdItem>(list: Map<string, S>) =>
  (noId?: IDGetter<S>) =>
    (item: S) => {
      const id = item.id ?? (noId && noId(item))
      list.set(id, item)
    }

export const createClearItems = <S extends IdItem>(list: Map<string, S>) => () => {
  list.clear()
}

export const createMaxAddItems = (max: number) =>
  <S extends IdItem>(list: Map<string, S>) =>
    (noId?: IDGetter<S>) => {
      const addMaxItem = createMaxAddItem(max)(list)(noId)
      return (items: S[]) => {
        items.find(addMaxItem)
      }
    }

export const createAddItems = <S extends IdItem>(list: Map<string, S>) =>
  (noId?: IDGetter<S>) => {
    const addItem = createAddItem<S>(list)(noId)
    return (items: S[]) => {
      items.forEach(addItem)
    }
  }

export const createRemoveItem = <S extends IdItem>(list: Map<string, S>) =>
  (id: string) => {
    list.delete(id)
  }

export const createGetItem = <S extends IdItem>(list: Map<string, S>) =>
  (id: string) => {
    return list.get(id)
  }

interface WithReturn<T extends IdItem, S extends IdItem> {
  additionalItem: T
  item: S
}

export const createGetWith = <T extends IdItem>(withList: Map<string, T>) =>
  <S extends IdItem>(list: Map<string, S>) =>
    (getId: IDGetter<S>) =>
      (id: string): WithReturn<T, S> => {
        const item = list.get(id)

        return {
          additionalItem: withList.get(getId(item)),
          item: item,
        }
      }
