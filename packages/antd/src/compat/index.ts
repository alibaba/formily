import {
  registerFormComponent,
  registerFormItemComponent
} from '@uform/react-schema-renderer'
import { CompatAntdForm as Form } from './Form'
import {
  CompatAntdFormItem as FormItem,
  CompatAntdFormItemProps as FormItemProps
} from './FormItem'

registerFormComponent(Form)

registerFormItemComponent(FormItem)

export { FormItemProps, FormItem }
