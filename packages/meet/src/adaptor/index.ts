import {
  registerFormComponent,
  registerFormItemComponent
} from '@formily/react-schema-renderer'
import { CompatNextForm } from './Form'
import { CompatNextFormItem } from './FormItem'

registerFormComponent(CompatNextForm)

registerFormItemComponent(CompatNextFormItem)

export { CompatNextForm, CompatNextFormItem }
