export interface IdItem extends Record<string, any> {
  id?: string
}

export interface IndexOptions {
  indexList: Map<any, string>
  name: string
}

export type IDGetter<S extends IdItem> = (item: S) => string

export const createMaxAddItem = (max: number) =>
  <S extends IdItem>(list: Map<string, S>, indexOptions?: IndexOptions) =>
    (noId?: IDGetter<S>) => {
      const addItem = createAddItem(list, indexOptions)(noId)
      return (item: S): boolean => {
        if (list.size < max) {
          addItem(item)
          return false
        }
        return true
      }
    }

export const createAddItem = <S extends IdItem>(list: Map<string, S>, indexOptions?: IndexOptions) => {
  const _indexOptions = indexOptions && {...indexOptions}
  return (noId?: IDGetter<S>) =>
    (item: S) => {
      const id = item.id ?? (noId && noId(item))
      list.set(id, item)
      if (_indexOptions) {
        _indexOptions.indexList.set(item[_indexOptions.name], id)
      }
    }
}

export const createClearItems = <S extends IdItem>(list: Map<string, S>, indexOptions?: IndexOptions) => () => {
  list.clear()
  if (indexOptions) {
    indexOptions.indexList.clear()
  }
}

export const createMaxAddItems = (max: number) =>
  <S extends IdItem>(list: Map<string, S>, indexOptions?: IndexOptions) =>
    (noId?: IDGetter<S>) => {
      const addMaxItem = createMaxAddItem(max)(list, indexOptions)(noId)
      return (items: S[]) => {
        items.find(addMaxItem)
      }
    }

export const createAddItems = <S extends IdItem>(list: Map<string, S>, indexOptions?: IndexOptions) =>
  (noId?: IDGetter<S>) => {
    const addItem = createAddItem<S>(list, indexOptions)(noId)
    return (items: S[]) => {
      items.forEach(addItem)
    }
  }

export const createRemoveItem = <S extends IdItem>(list: Map<string, S>, indexOptions?: IndexOptions) => {
  const _indexOptions = indexOptions && {...indexOptions}
  return (id: string) => {
    if (_indexOptions) {
      const item = list.get(id)
      _indexOptions.indexList.delete(item[_indexOptions.name])
    }

    list.delete(id)
  }
}

export const createGetItem = <S extends IdItem>(list: Map<string, S>) =>
  (id: string) => {
    return list.get(id)
  }

export const createGetItemByIndex =  <S extends IdItem>(list: Map<string, S>, indexOptions?: IndexOptions) => {
  const _indexOptions = indexOptions && {...indexOptions}
  return (id: any): S | undefined => {
    if (_indexOptions) {
      const listId = _indexOptions.indexList.get(id)
      return list.get(listId)
    }
  }
}
