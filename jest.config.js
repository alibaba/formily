module.exports = {
  collectCoverage: true,
  verbose: true,
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
  setupFilesAfterEnv: [
    require.resolve('jest-dom/extend-expect'),
    './global.config.ts',
  ],
  // moduleNameMapper: process.env.TEST_ENV === 'production' ? undefined : alias,
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
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
}
