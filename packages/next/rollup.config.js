import baseConfig from '../../scripts/rollup.base.js'
import postcss from 'rollup-plugin-postcss'
import path from 'path'

export default baseConfig(
  'formily.next',
  'Formily.Next',
  postcss({
    extract: path.resolve('dist/next.css'),
  })
)
