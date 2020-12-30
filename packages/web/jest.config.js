const baseConfig = require('../../jest.base')

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    '^next': '<rootDir>/__mocks__/next.mock.ts',
    '^src(.*)$': '<rootDir>/src$1',
  },
}
