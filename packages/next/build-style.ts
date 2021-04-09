import { build } from '../../scripts/build-style'

build({
  esStr: '@alifd/next/es/',
  libStr: '@alifd/next/lib/',
  styleEntry: 'main.scss',
  allStylesOutputFile: 'dist/next.css',
  // antd/es/button/style/index ===> antd/es/button/style/css
  importCssCompilerToCssTransform: (v) =>
    v.replace(/'@alifd\/next\/(es|lib)\/(.*)'/g, (subStr) =>
      subStr.replace(/\/style'$/, `/index.css'`)
    ),
})
