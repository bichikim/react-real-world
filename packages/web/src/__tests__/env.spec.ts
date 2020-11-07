import {apiUrl} from 'src/env'

describe('env', function test() {
  describe('apiUrl', function test() {
    afterEach(() => {
      process.env.API_URL = undefined
    })

    it('should return default api url', function test() {
      expect(apiUrl()).toBe('http://localhost:9090')
    })
    it('should return process.env.API_URL', function test() {
      process.env.API_URL = 'http://localhost:8080'
      expect(apiUrl()).toBe('http://localhost:8080')
    })
  })
})
