import baseConfig, {
  removeImportStyleFromInputFilePlugin,
} from '../../scripts/rollup.base.js'

export default baseConfig(
  'formily.next',
  'Formily.Next',
  removeImportStyleFromInputFilePlugin()
)
