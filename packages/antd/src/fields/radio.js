import { connect, registerFormField } from '@uform/react'
import { Radio } from 'antd'
import {
  transformDataSourceKey,
  mapLoadingProps,
  mapTextComponent
} from '../utils'

const { Group: RadioGroup } = Radio

registerFormField(
  'radio',
  connect({
    getProps: mapLoadingProps,
    getComponent: mapTextComponent
  })(transformDataSourceKey(RadioGroup, 'options'))
)
