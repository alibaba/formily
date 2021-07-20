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
    '*.less',
    '**/*/style.js',
  ])
})

test('dist/*', () => {
  // eg. import "@formily/antd/dist/antd.css"
  expect(
    SideEffectsFlagPlugin.moduleHasSideEffects('dist/antd.css', 'dist/*')
  ).toBeTruthy()
  expect(
    SideEffectsFlagPlugin.moduleHasSideEffects(
      'dist/formily.antd.umd.development.js',
      'dist/*'
    )
  ).toBeTruthy()
  expect(
    SideEffectsFlagPlugin.moduleHasSideEffects(
      'dist/formily.antd.umd.production.js',
      'dist/*'
    )
  ).toBeTruthy()
})

test('esm/*.js & lib/*.js', () => {
  // expected to be truthy
  // eg. import FormilyAntd from "@formily/antd/esm/index"
  expect(
    SideEffectsFlagPlugin.moduleHasSideEffects('esm/index.js', 'esm/*.js')
  ).toBeTruthy()
  expect(
    SideEffectsFlagPlugin.moduleHasSideEffects('lib/index.js', 'lib/*.js')
  ).toBeTruthy()

  // expected to be falsy
  // eg. import Input from "@formily/antd/esm/input/index" => will be compiled to __webpack_require__("./node_modules/@formily/antd/esm/input/index.js")
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

test('*.less', () => {
  //  eg. import "@formily/antd/lib/input/style.less"
  expect(
    SideEffectsFlagPlugin.moduleHasSideEffects(
      `${baseName}/lib/input/style.less`,
      '*.less'
    )
  ).toBeTruthy()
})

test('**/*/style.js', () => {
  // eg. import "@formily/antd/lib/input/style" will be compiled to  __webpack_require__("./node_modules/@formily/antd/lib/input/style.js")
  // so we can match the `*style.js` only, not `**/*/style*` may be cause someting mismatch like `@formily/antd/lib/xxx-style/index.js`
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
