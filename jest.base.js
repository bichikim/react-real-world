module.exports = {
  cacheDirectory: './.jest/cache',
  maxWorkers: '70%',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  snapshotSerializers: ['@emotion/jest/serializer'],

  testMatch: [
    '<rootDir>/src/**/*.spec.ts',
  ],

  testPathIgnorePatterns: [
    '\\.snap$',
    '/node_modules/',
    '(/__tests__/.*|(\\.|/)(test|spec))\\.d.ts$',
  ],
}
