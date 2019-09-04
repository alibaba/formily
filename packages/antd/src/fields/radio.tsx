import { connect, registerFormField } from '@uform/react-schema-form'
import { Radio } from 'antd'
import {
  transformDataSourceKey,
  mapStyledProps,
  mapTextComponent
} from '../utils'

const { Group: RadioGroup } = Radio

registerFormField(
  'radio',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(transformDataSourceKey(RadioGroup, 'options'))
)
