import baseConfig, {
  removeImportStyleFromInputFilePlugin,
} from '../../scripts/rollup.base.js'

export default baseConfig(
  'formily.designable.next',
  'Formily.Designable.Next',
  removeImportStyleFromInputFilePlugin()
)
