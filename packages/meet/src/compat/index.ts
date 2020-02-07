import {
  registerFormComponent,
  registerFormItemComponent
} from '@uform/react-schema-renderer'
import { CompatNextForm } from './Form'
import { CompatNextFormItem } from './FormItem'

registerFormComponent(CompatNextForm)

registerFormItemComponent(CompatNextFormItem)
