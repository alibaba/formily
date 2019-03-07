import { connect, registerFormField } from '@uform/react'
import { Checkbox } from 'antd'
import {
  transformDataSourceKey,
  mapLoadingProps,
  mapTextComponent
} from '../utils'

const { Group: CheckboxGroup } = Checkbox

registerFormField(
  'checkbox',
  connect({
    getProps: mapLoadingProps,
    getComponent: mapTextComponent
  })(transformDataSourceKey(CheckboxGroup, 'options'))
)
