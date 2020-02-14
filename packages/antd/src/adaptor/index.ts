import {
  registerFormComponent,
  registerFormItemComponent
} from '@formily/react-schema-renderer'
import { AntdSchemaFormAdaptor } from './Form'
import { AntdSchemaFieldAdaptor } from './FormItem'

registerFormComponent(AntdSchemaFormAdaptor)

registerFormItemComponent(AntdSchemaFieldAdaptor)

export { AntdSchemaFormAdaptor, AntdSchemaFieldAdaptor }
