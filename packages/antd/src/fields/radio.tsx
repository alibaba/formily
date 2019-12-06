import { connect, registerFormField } from '@uform/react-schema-renderer'
import { Radio } from 'antd'
import {
  transformDataSourceKey,
  mapStyledProps,
  mapTextComponent
} from '../shared'

const { Group: RadioGroup } = Radio

registerFormField(
  'radio',
  connect({
    getProps: mapStyledProps,
    getComponent: mapTextComponent
  })(transformDataSourceKey(RadioGroup, 'options'))
)
