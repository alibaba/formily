const fs = require('fs-extra')
const path = require('path')
const packagesDir = path.resolve(process.cwd(), './packages')
const packages = fs.readdirSync(packagesDir)
const alias = packages
  .map((v) => path.join(packagesDir, v))
  .filter((v) => {
    return !fs.statSync(v).isFile()
  })
  .reduce((buf, _path) => {
    const name = path.basename(_path)
    return {
      ...buf,
      [`@formily/${name}$`]: `${_path}/src`,
    }
  }, {})
module.exports = {
  collectCoverage: true,
  verbose: true,
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
  setupFilesAfterEnv: [
    require.resolve('jest-dom/extend-expect'),
    path.resolve(__dirname, './global.ts'),
  ],
 // moduleNameMapper: process.env.TEST_ENV === 'production' ? undefined : alias,
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsconfig: 'tsconfig.jest.json',
      diagnostics: false,
    },
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/',
    '/esm/',
    '/lib/',
    'package.json',
    '/demo/',
    '/packages/builder/src/__tests__/',
    '/packages/builder/src/components/',
    '/packages/builder/src/configs/',
    'package-lock.json',
  ],
}
