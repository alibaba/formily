import './form'
import './fields/string'
import './fields/number'
import './fields/boolean'
import './fields/date'
import './fields/time'
import './fields/range'
import './fields/upload'
import './fields/checkbox'
import './fields/radio'
import './fields/rating'
import './fields/transfer'
import './fields/array'
import './fields/table'
import './fields/textarea'
import './fields/password'
import './fields/cards'

export * from '@uform/react'
export * from './components/formButtonGroup'
export * from './components/button'
export * from './components/layout'
import React from 'react'
import {
  SchemaForm as InternalSchemaForm,
  Field as InternalField
} from '@uform/react'
import { SchemaFormProps, FieldProps } from './type'

export { mapStyledProps, mapTextComponent } from './utils'

export default class SchemaForm<V> extends React.Component<SchemaFormProps<V>> {
  render() {
    return <InternalSchemaForm {...this.props} />
  }
}

export class Field<V, T extends string> extends React.Component<
  FieldProps<V, T>
> {
  render() {
    return <InternalField {...this.props} />
  }
}
