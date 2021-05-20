import baseConfig, {
  removeImportStyleFromInputFilePlugin,
} from '../../scripts/rollup.base.js'

export default baseConfig(
  'formily.designable.antd',
  'Formily.Designable.Antd',
  removeImportStyleFromInputFilePlugin()
)
