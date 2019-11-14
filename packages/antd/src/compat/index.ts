import {
  registerFormComponent,
  registerFormItemComponent
} from '@uform/react-schema-renderer'
import { CompatAntdForm } from './Form'
import { CompatAntdFormItem } from './FormItem'

registerFormComponent(CompatAntdForm)

registerFormItemComponent(CompatAntdFormItem)
