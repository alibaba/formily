import baseConfig, {
  removeImportStyleFromInputFilePlugin,
} from '../../scripts/rollup.base.js'
import postcss from 'rollup-plugin-postcss'
import NpmImport from 'less-plugin-npm-import'

export default baseConfig(
  'formily.designable.antd',
  'Formily.Designable.Antd',
  removeImportStyleFromInputFilePlugin(),
  postcss({
    extract: true,
    minimize: true,
    // extensions: ['.css', '.less', '.sass'],
    use: {
      less: {
        plugins: [new NpmImport({ prefix: '~' })],
        javascriptEnabled: true,
      },
      sass: {},
      stylus: {},
    },
  })
)
