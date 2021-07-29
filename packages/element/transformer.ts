import * as ts from 'typescript'
import createTransformer from 'ts-import-plugin'

const transformer = createTransformer({
  libraryName: 'element-ui',
  libraryDirectory: 'lib',
  camel2DashComponentName: true,
  style: false,
})

export default function (program: ts.Program, pluginOptions: {}) {
  return transformer
}
