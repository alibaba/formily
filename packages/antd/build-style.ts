import { build } from '../../scripts/build-style'

build({
  esStr: 'antd/es/',
  libStr: 'antd/lib/',
  styleEntry: 'style.less',
  // antd/es/button/style/index ===> antd/es/button/style/css
  importCssCompilerToCssTransform: (v) =>
    v.replace(/'antd\/(es|lib)\/(.*)'/, (subStr) =>
      subStr.replace(/\/style\/index'$/, `/style/css'`)
    ),
})
