import {
  createAddItem,
  createAddItems,
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
        const maxAddItem = createMaxAddItem(3)(list)

        maxAddItem('1', '1')
        maxAddItem('2', '2')
        maxAddItem('3', '3')
        expect(list.size).toBe(3)
        maxAddItem('4', '4')
        expect(list.size).toBe(3)
      }
      {
        const list: Map<string, any> = new Map<string, any>()
        const maxAddList = createMaxAddItem(0)(list)
        maxAddList('1', '1')
        expect(list.size).toBe(0)
        maxAddList('2', '2')
        expect(list.size).toBe(0)
      }
    })
  })
  describe('create-add-item', function test() {
    it('should add item to the list', function test() {
      const list: Map<string, any> = new Map<string, any>()
      const addItem = createAddItem(list)
      addItem('1', '1')
      addItem('2', '2')
      expect(list.size).toBe(2)
      expect(list.get('1')).toBe('1')
      expect(list.get('2')).toBe('2')
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
    it('should ', function test() {
      const list: Map<string, any> = new Map<string, any>()
      const maxAddItems = createMaxAddItems(2)(list)
      maxAddItems([
        ['1', '1'],
        ['2', '2'],
        ['3', '3'],
      ])
      expect(list.size).toBe(2)
    })
  })
  describe('create-add-items', function test() {
    it('should ', function test() {
      const list: Map<string, any> = new Map<string, any>()
      const maxAddItems = createAddItems(list)
      maxAddItems([
        ['1', '1'],
        ['2', '2'],
        ['3', '3'],
      ])
      expect(list.size).toBe(3)
    })
  })
})
