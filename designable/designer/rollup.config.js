import baseConfig, {
  removeImportStyleFromInputFilePlugin,
} from '../../scripts/rollup.base.js'

export default baseConfig(
  'formily.designable.setters',
  'Formily.Designable.Setters',
  removeImportStyleFromInputFilePlugin()
)
