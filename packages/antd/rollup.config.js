import baseConfig from '../../scripts/rollup.base.js'
import postcss from 'rollup-plugin-postcss'
import NpmImport from 'less-plugin-npm-import'
import path from 'path'

export default baseConfig(
  'formily.antd',
  'Formily.Antd',
  postcss({
    extract: path.resolve('dist/antd.css'),
    use: [
      [
        'less',
        {
          javascriptEnabled: true,
          plugins: [new NpmImport({ prefix: '~' })],
        },
      ],
    ],
  })
)
