import { registerFormWrapper } from '../shared/core'
import { StateForm } from './form'

export default () => {
  registerFormWrapper(StateForm())
}
