import {
  registerFormComponent,
  registerFormItemComponent
} from '@formily/react-schema-renderer'
import { NextSchemaFormAdaptor } from './Form'
import { NextSchemaFieldAdaptor } from './FormItem'

registerFormComponent(NextSchemaFormAdaptor)

registerFormItemComponent(NextSchemaFieldAdaptor)

export {
  NextSchemaFormAdaptor,
  NextSchemaFieldAdaptor
}
