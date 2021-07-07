import baseConfig, {
  removeImportStyleFromInputFilePlugin,
} from '../../scripts/rollup.base.js'

export default baseConfig(
  'formily.element',
  'Formily.Element',
  removeImportStyleFromInputFilePlugin()
)
