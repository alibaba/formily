import { build } from '../../scripts/build-style'

build({
  esStr: 'element/es/',
  libStr: 'element/lib/',
  allStylesOutputFile: 'dist/element.css',
})
