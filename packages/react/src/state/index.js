import { registerFieldMiddleware, registerFormWrapper } from '../shared/core'
import { StateForm } from './form'
import { StateField } from './field'

export default () => {
  registerFormWrapper(StateForm())
  registerFieldMiddleware(StateField())
}
