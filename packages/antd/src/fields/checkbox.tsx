import { connect, registerFormField } from '@formily/react-schema-renderer'
import { Checkbox } from 'antd'
import {
  transformDataSourceKey,
  mapStyledProps,
  mapTextComponent
} from '../shared'

const { Group: CheckboxGroup } = Checkbox

registerFormField(
  'checkbox',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(transformDataSourceKey(CheckboxGroup, 'options'))
)
