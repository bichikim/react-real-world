const path = require('path')

module.exports = {
  cacheDirectory: './.jest/cache',

  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
  ],

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/file.mock.ts',
  },

  setupFiles: [path.resolve(__dirname, 'jest.setup.js')],

  setupFilesAfterEnv: ['jest-extended'],

  snapshotSerializers: ['jest-emotion'],

  testMatch: [
    '**/__tests__/**/?(*.)(spec|test).[jt]s?(x)',
  ],

  testPathIgnorePatterns: [
    '\\.snap$',
    '<rootDir>/node_modules/',
    '(/__tests__/.*|(\\.|/)(test|spec))\\.d.ts$',
  ],

  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!lodash-es)',
  ],
}
