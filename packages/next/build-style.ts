import { build } from '../../scripts/build-style'

build({
  esStr: '@alifd/next/es/',
  libStr: '@alifd/next/lib/',
  allStylesOutputFile: 'dist/next.css',
})
