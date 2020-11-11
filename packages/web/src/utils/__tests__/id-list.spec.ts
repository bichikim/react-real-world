import {
  createAddItem,
  createAddItems,
  createClearItems,
  createGetItem,
  createMaxAddItem,
  createMaxAddItems,
  createRemoveItem,
} from '../id-list'

describe('id-list', function test() {
  describe('create-max-add-item', function test() {
    it('should add item to the list with max count', function test() {
      {
        const list: Map<string, any> = new Map<string, any>()
        const maxAddItem = createMaxAddItem(3)(list)()

        maxAddItem({id: '1', value: '1'})
        maxAddItem({id: '2', value: '2'})
        maxAddItem({id: '3', value: '3'})
        expect(list.size).toBe(3)
        maxAddItem({id: '4', value: '4'})
        expect(list.size).toBe(3)
      }
      {
        const list: Map<string, any> = new Map<string, any>()
        const maxAddItem = createMaxAddItem(0)(list)()
        maxAddItem({id: '1', value: '1'})
        expect(list.size).toBe(0)
        maxAddItem({id: '2', value: '2'})
        expect(list.size).toBe(0)
      }
    })
  })

  describe('create-add-item', function test() {
    it('should add item to the list', function test() {
      const list: Map<string, any> = new Map<string, any>()
      const addItem = createAddItem(list)()
      addItem({id: '1', value: '1'})
      addItem({id: '2', value: '2'})
      expect(list.size).toBe(2)
      expect(list.get('1').value).toBe('1')
      expect(list.get('2').value).toBe('2')
    })
  })

  describe('create-remove-item', function test() {
    it('should remove item from the list', function test() {
      const list: Map<string, any> = new Map<string, any>([['1', '1'], ['2', '2']])
      const removeItem = createRemoveItem(list)
      removeItem('1')
      expect(list.size).toBe(1)
      expect(list.get('1')).toBe(undefined)
      expect(list.get('2')).toBe('2')
    })
  })

  describe('create-get-item', function test() {
    it('should get item', function test() {
      const list: Map<string, any> = new Map<string, any>([['1', '1'], ['2', '2']])
      const getItem = createGetItem(list)
      expect(getItem('1')).toBe('1')
      expect(getItem('2')).toBe('2')
      expect(getItem('3')).toBe(undefined)
    })
  })

  describe('create-max-add-items', function test() {
    it('should add items to maximum length', function test() {
      const list: Map<string, any> = new Map<string, any>()
      const maxAddItems = createMaxAddItems(2)(list)()
      maxAddItems([
        {id: '1', value: '1'},
        {id: '2', value: '2'},
        {id: '3', value: '3'},
      ])
      expect(list.size).toBe(2)
    })
  })

  describe('create-add-items', function test() {
    it('should add items', function test() {
      const list: Map<string, any> = new Map<string, any>()
      const maxAddItems = createAddItems(list)()
      maxAddItems([
        {id: '1', value: '1'},
        {id: '2', value: '2'},
        {id: '3', value: '3'},
      ])
      expect(list.size).toBe(3)
    })
  })

  describe('create-clear-items', function test() {
    it('should remove all items', function test() {
      const list: Map<string, any> = new Map<string, any>([['1', {id: '1', value: '1'}], ['2', {id: '2', value: '2'}]])
      const maxClearItems = createClearItems(list)
      expect(list.size).toBe(2)
      maxClearItems()
      expect(list.size).toBe(0)
    })
  })

  describe('no id', function test() {
    it('should add item without id', function test() {
      const list: Map<string, any> = new Map<string, any>()
      const addItem = createAddItem(list)((item) => item.value)
      addItem({value: '1'})
      expect(list.get('1').value).toBe('1')
    })
  })
})
