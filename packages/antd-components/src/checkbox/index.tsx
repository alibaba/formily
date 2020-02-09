import { connect } from '@formily/react-schema-renderer'
import { Checkbox as AntdCheckbox } from 'antd'
import {
  transformDataSourceKey,
  mapStyledProps,
  mapTextComponent
} from '../shared'

export const Checkbox = connect({
  getProps: mapStyledProps,
  getComponent: mapTextComponent
})(transformDataSourceKey(AntdCheckbox, 'options'))

Checkbox.Group = connect({
  getProps: mapStyledProps,
  getComponent: mapTextComponent
})(AntdCheckbox.Group)

export default Checkbox