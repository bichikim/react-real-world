import {getStorage, getStorageValue, saveStorageValue} from 'src/utils'

describe('object-storage', function test() {

  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  describe('get-storage', function test() {
    it('should return proper storage', function test() {
      {
        const storage = getStorage('local')
        expect(storage).toBe(localStorage)
      }
      {
        const storage = getStorage('session')
        expect(storage).toBe(sessionStorage)
      }
    })
  })
  describe('get-storage-value', function test() {
    it('should load local or session storage', function test() {
      const key = 'foo'
      const data = {foo: 'foo'}
      localStorage.setItem(key, JSON.stringify(data))
      sessionStorage.setItem(key, JSON.stringify(data))
      {
        const result = getStorageValue('local')(key)()
        expect(result).toEqual(data)
      }
      {
        const result = getStorageValue('session')(key)()
        expect(result).toEqual(data)
      }
    })
  })
  describe('save-storage-value', function test() {
    it('should save local or session storage', function test() {
      const key = 'foo'
      const data = {foo: 'foo'}
      saveStorageValue('local')(key)(data)
      saveStorageValue('session')(key)(data)
      expect(JSON.parse(localStorage.getItem(key) as any)).toEqual(data)
      expect(JSON.parse(sessionStorage.getItem(key) as any)).toEqual(data)
    })
  })
})
