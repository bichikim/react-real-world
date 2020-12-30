module.exports = {
  cacheDirectory: './.jest/cache',
  collectCoverageFrom: [
    '<rootDir>/packages/*/src/**/*.{ts,tsx}',
    '!<rootDir>/**/*.stories.{ts,tsx}',
    '!<rootDir>/**/*.spec.{ts,tsx}',
  ],
  maxWorkers: '70%',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

  setupFiles: ['./jest.setup.js'],

  snapshotSerializers: ['@emotion/jest/serializer'],

  testMatch: [
    '<rootDir>/packages/*/src/**/*.spec.ts',
  ],

  testPathIgnorePatterns: [
    '\\.snap$',
    '/node_modules/',
    '(/__tests__/.*|(\\.|/)(test|spec))\\.d.ts$',
  ],
}
