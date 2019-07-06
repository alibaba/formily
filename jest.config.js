// jest.config.js

// Note: If you are using babel version 7 you have to install babel-jest with
// yarn add --dev babel-jest 'babel-core@^7.0.0-bridge' @babel/core

module.exports = {
  collectCoverage: true,
  verbose: true,
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    require.resolve('jest-dom/extend-expect'),
    require.resolve('@testing-library/react/cleanup-after-each'),
    './scripts/global.js'
  ],
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsConfig: 'tsconfig.jest.json'
    }
  },
  watchPlugins: ['jest-watch-lerna-packages'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'package.json',
    '/demo/',
    '/packages/builder/src/__tests__/',
    '/packages/builder/src/components/',
    '/packages/builder/src/configs/',
    'package-lock.json'
  ]
}
