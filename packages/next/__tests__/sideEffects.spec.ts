import SideEffectsFlagPlugin from 'webpack/lib/optimize/SideEffectsFlagPlugin'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { sideEffects, name: baseName } = require('../package.json')

test('sideEffects should be controlled manually', () => {
  // if config in pkg.json changed, please ensure it is covered by jest.
  expect(sideEffects).toStrictEqual([
    'dist/*',
    'esm/*.js',
    'lib/*.js',
    'src/*.ts',
    '*.scss',
    '**/*/style.js',
  ])
})

test('dist/*', () => {
  // eg. import "@formily/next/dist/next.css"
  expect(
    SideEffectsFlagPlugin.moduleHasSideEffects('dist/next.css', 'dist/*')
  ).toBeTruthy()
  expect(
    SideEffectsFlagPlugin.moduleHasSideEffects(
      'dist/formily.next.umd.production.js',
      'dist/*'
    )
  ).toBeTruthy()
  expect(
    SideEffectsFlagPlugin.moduleHasSideEffects(
      'dist/formily.next.umd.production.js',
      'dist/*'
    )
  ).toBeTruthy()
})

test('esm/*.js & lib/*.js', () => {
  // expected to be truthy
  // eg. import Formilynext from "@formily/next/esm/index"
  expect(
    SideEffectsFlagPlugin.moduleHasSideEffects('esm/index.js', 'esm/*.js')
  ).toBeTruthy()
  expect(
    SideEffectsFlagPlugin.moduleHasSideEffects('lib/index.js', 'lib/*.js')
  ).toBeTruthy()

  // expected to be falsy
  // eg. import Input from "@formily/next/esm/input/index" => will be compiled to __webpack_require__("./node_modules/@formily/next/esm/input/index.js")
  // It should be removed by webpack if not used after imported.
  expect(
    SideEffectsFlagPlugin.moduleHasSideEffects('esm/input/index.js', 'esm/*.js')
  ).toBeFalsy()
  expect(
    SideEffectsFlagPlugin.moduleHasSideEffects(
      'esm/array-base/index.js',
      'esm/*.js'
    )
  ).toBeFalsy()
  expect(
    SideEffectsFlagPlugin.moduleHasSideEffects('lib/input/index.js', 'lib/*.js')
  ).toBeFalsy()
})

test('*.scss', () => {
  //  eg. import "@formily/next/lib/input/style.scss"
  expect(
    SideEffectsFlagPlugin.moduleHasSideEffects(
      `${baseName}/lib/input/style.scss`,
      '*.scss'
    )
  ).toBeTruthy()
})

test('**/*/style.js', () => {
  // eg. import "@formily/next/lib/input/style" will be compiled to  __webpack_require__("./node_modules/@formily/next/lib/input/style.js")
  // so we can match the `*style.js` only, not `**/*/style*` may be cause someting mismatch like `@formily/next/lib/xxx-style/index.js`
  const modulePathArr = [
    'lib/input/style.js',
    `${baseName}/lib/input/style.js`,
    `./node_modules/${baseName}/style.js`,
  ]

  modulePathArr.forEach((modulePath) => {
    const hasSideEffects = SideEffectsFlagPlugin.moduleHasSideEffects(
      modulePath,
      '**/*/style.js'
    )
    expect(hasSideEffects).toBeTruthy()
  })
})
