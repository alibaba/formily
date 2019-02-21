import { registerFieldMiddleware, registerFormWrapper } from '../shared/core'
import { StateForm } from './form'
import { StateField } from './field'

registerFormWrapper(StateForm())

registerFieldMiddleware(StateField())
