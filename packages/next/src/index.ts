import './form'
import './fields/string'
import './fields/number'
import './fields/boolean'
import './fields/date'
import './fields/time'
import './fields/range'
import './fields/upload'
import './fields/checkbox'
import './fields/radio'
import './fields/rating'
import './fields/transfer'
import './fields/array'
import './fields/cards'
import './fields/table'
import './fields/textarea'
import './fields/password'

export * from '@uform/react'
export * from './components/formButtonGroup'
export * from './components/button'
export * from './components/layout'

import { SchemaForm as ReactSchemaForm } from '@uform/react'
import { mapStyledProps, mapTextComponent } from './utils'
import { ISchemaFormProps, ISchemaFormExpandProps } from './type'

export { mapStyledProps, mapTextComponent }

export const SchemaForm: React.ComponentClass<
  ISchemaFormProps & ISchemaFormExpandProps
> = ReactSchemaForm

export default SchemaForm
