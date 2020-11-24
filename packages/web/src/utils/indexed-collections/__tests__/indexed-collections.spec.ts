import {createIndexedCollections, createIndexedStructure} from '..'

const dataList = [
  {id: 'i1', title: 'bar', type: 'moon'},
  {id: 'i2', title: 'foo', type: 'sun'},
  {id: 'i3', title: 'jhon', type: 'star'},
]

describe('indexed-collections', function test() {
  describe('createIndexedStructure', function test() {
    it('should return a structure for indexing ', function test() {

      const result = createIndexedStructure(dataList, ['id', 'type'])

      expect(result.indexRecord.id).toMatchSnapshot()
      expect(result.indexRecord.type).toMatchSnapshot()
      expect(result.indexRecord.title).toMatchSnapshot()
    })
  })

  describe('createIndexedCollections', function test() {
    it('should return', function test() {

      const result = createIndexedCollections(
        dataList,
        ['id', 'type'],
      )

      expect([...result]).toEqual(dataList)

      expect(result.size).toBe(3)
      expect(result.get('id', 'i1')).toEqual(dataList[0])
      expect(result.has(dataList[0])).toEqual(true)
      expect(result.has({id: 'i4', title: 'dax', type: 'mars'})).toEqual(false)
      expect([...result.keys('type')]).toEqual(['moon', 'sun', 'star'])
      expect([...result.keys('id')]).toEqual(['i1', 'i2', 'i3'])
      expect([...result.values()]).toEqual(dataList)
      expect([...result.entries('id')]).toEqual([
        ['i1', dataList[0]],
        ['i2', dataList[1]],
        ['i3', dataList[2]],
      ])

      const newItem = {
        id: 'i4',
        title: 'dax',
        type: 'mars',
      }

      result.set(newItem)
      expect(result.has(newItem)).toBe(true)

      result.delete(newItem)
      expect(result.has(newItem)).toBe(false)

      result.set(newItem)
      expect(result.has(newItem)).toBe(true)

      result.deleteByKeyValue('id', 'i4')
      expect(result.has(newItem)).toBe(false)

      const list = []

      result.forEach('id', (item, key) => {
        list.push([key, item])
      })

      expect(list).toEqual([
        ['i1', dataList[0]],
        ['i2', dataList[1]],
        ['i3', dataList[2]],
      ])

      expect([...result.map('id', (item, id) => [id, item])]).toEqual([
        ['i1', dataList[0]],
        ['i2', dataList[1]],
        ['i3', dataList[2]],
      ])
    })
  })
})
