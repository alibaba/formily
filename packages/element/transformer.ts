import createTransformer from 'ts-import-plugin'

const transformer = createTransformer({
  libraryName: 'element-ui',
  libraryDirectory: 'lib',
  camel2DashComponentName: true,
  style: false,
})

export default function () {
  return transformer
}
