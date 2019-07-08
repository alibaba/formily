import { connect, registerFormField } from '@uform/react'
import { Checkbox } from 'antd'
import {
  transformDataSourceKey,
  mapStyledProps,
  mapTextComponent
} from '../utils'

const { Group: CheckboxGroup } = Checkbox

registerFormField(
  'checkbox',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(transformDataSourceKey(CheckboxGroup, 'options'))
)
