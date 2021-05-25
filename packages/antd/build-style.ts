import { build } from '../../scripts/build-style'

build({
  esStr: 'antd/es/',
  libStr: 'antd/lib/',
  allStylesOutputFile: 'dist/antd.css',
})
