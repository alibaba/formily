import createTransformer from 'ts-import-plugin'

const transformer = createTransformer({
  libraryName: 'vant2',
  libraryDirectory: 'lib',
  camel2DashComponentName: true,
  style: false,
})

export default function () {
  return transformer
}
