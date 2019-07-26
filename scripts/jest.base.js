const fs = require('fs-extra')
const path = require('path')
const packagesDir = path.resolve(process.cwd(), './packages')
const packages = fs.readdirSync(packagesDir)
const alias = packages
  .map(v => path.join(packagesDir, v))
  .filter(v => {
    return !fs.statSync(v).isFile()
  })
  .reduce((buf, _path) => {
    const name = path.basename(_path)
    return {
      ...buf,
      [`@uform/${name}`]: `${_path}/src`
    }
  }, {})
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
  moduleNameMapper: process.env.TEST_ENV === 'production' ? undefined : alias,
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsConfig: 'tsconfig.jest.json'
    }
  },
  //watchPlugins: ['jest-watch-lerna-packages'],
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
