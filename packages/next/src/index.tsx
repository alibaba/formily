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
import './fields/cards'
import './fields/table'
import './fields/textarea'
import './fields/password'

export * from '@uform/react'
export * from './components/formButtonGroup'
export * from './components/button'
export * from './components/layout'

import React from 'react'
import {
  SchemaForm as InternalSchemaForm,
  Field as InternalField
} from '@uform/react'
import { mapStyledProps, mapTextComponent } from './utils'
import { ISchemaFormProps, ISchemaFormExpandProps } from './type'
import { ISchema } from '@uform/types'
import { SwitchProps } from '@alifd/next/types/switch'
import { GroupProps as CheckboxGroupProps } from '@alifd/next/types/checkbox'
import { GroupProps as RadioGroupProps } from '@alifd/next/types/radio'
import {
  DatePickerProps,
  RangePickerProps,
  MonthPickerProps,
  YearPickerProps
} from '@alifd/next/types/date-picker'
import { NumberPickerProps } from '@alifd/next/types/number-picker'
import { IPasswordProps } from './fields/password'
import { RangeProps } from '@alifd/next/types/range'
import { RatingProps } from '@alifd/next/types/rating'
import { InputProps, TextAreaProps } from '@alifd/next/types/input'
import { TimePickerProps } from '@alifd/next/types/time-picker'
import { TransferProps } from '@alifd/next/types/transfer'
import { IUploaderProps } from './fields/upload'
import { SelectProps } from '@alifd/next/types/select'

export { mapStyledProps, mapTextComponent }

export type SchemaFormProps<V> = ISchemaFormProps<V> & ISchemaFormExpandProps

export default class SchemaForm<V> extends React.Component<SchemaFormProps<V>> {
  render() {
    return <InternalSchemaForm {...this.props} />
  }
}

interface InternalFieldTypes {
  boolean: SwitchProps | SelectProps
  checkbox: CheckboxGroupProps
  date: DatePickerProps
  daterange: RangePickerProps
  month: MonthPickerProps
  // week: WeekPickerProps
  year: YearPickerProps
  number: NumberPickerProps | SelectProps
  password: IPasswordProps
  radio: RadioGroupProps
  range: RangeProps
  rating: RatingProps
  string: InputProps | SelectProps
  textarea: TextAreaProps | SelectProps
  time: TimePickerProps
  transfer: TransferProps
  upload: IUploaderProps
}

export interface FieldProps<V, T extends string> extends ISchema<V> {
  type?: T
  name?: string
  editable?: boolean
  ['x-props']?: T extends keyof InternalFieldTypes ? InternalFieldTypes[T] : any
}

export class Field<V, T extends string> extends React.Component<
  FieldProps<V, T>
> {
  render() {
    return <InternalField {...this.props} />
  }
}
