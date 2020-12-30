const baseConfig = require('./jest.base')

const _config = {...baseConfig, collectCoverageFrom: undefined, testMatch: undefined}

module.exports = {
  ..._config,

  collectCoverage: true,

  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
  ],

  moduleNameMapper: {

    '\\.(css|scss)$': 'identity-obj-proxy',

    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/file.mock.ts',
  },

  projects: ['<rootDir>/packages/*/jest.config.js'],

  setupFiles: ['./jest.setup.js'],

  // setupFilesAfterEnv: ['jest-extended'],

}
