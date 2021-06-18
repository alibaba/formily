import * as Types from './types'
import * as Models from './models'

declare global {
  namespace Formily.Core {
    export { Types, Models }
  }
}
