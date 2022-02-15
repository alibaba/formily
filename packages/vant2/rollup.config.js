import baseConfig, {
  removeImportStyleFromInputFilePlugin,
} from '../../scripts/rollup.base.js'

export default baseConfig(
  'formily.vant2',
  'Formily.vant2',
  removeImportStyleFromInputFilePlugin()
)
