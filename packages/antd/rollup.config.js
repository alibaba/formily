import baseConfig, {
  removeImportStyleFromInputFilePlugin,
} from '../../scripts/rollup.base.js'

export default baseConfig(
  'formily.antd',
  'Formily.Antd',
  removeImportStyleFromInputFilePlugin()
)
