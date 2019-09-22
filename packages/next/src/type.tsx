import { ButtonProps } from '@alifd/next/types/button'
import { CardProps } from '@alifd/next/types/card'
import { RowProps, ColProps } from '@alifd/next/types/grid'
import {
  IFormActions,
  ISchema,
  IEffects,
  IFieldError,
  Size,
  TextAlign,
  Layout,
  TextEl,
  LabelAlign
} from '@uform/types'
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

type ColSpanType = number | string

export interface ColSize {
  span?: ColSpanType
  offset?: ColSpanType
}

export interface ILocaleMessages {
  [key: string]: string | ILocaleMessages
}

export interface IFormLayoutProps {
  className?: string
  inline?: boolean
  labelAlign?: LabelAlign
  wrapperCol?: IColProps | number
  labelCol?: IColProps | number
  labelTextAlign?: TextAlign
  size?: Size
  style?: React.CSSProperties
}

export interface IFormItemGridProps {
  cols?: Array<number | { span: number; offset: number }>
  description?: TextEl
  gutter?: number
  title?: TextEl
}

export type TFormCardOrFormBlockProps = Omit<CardProps, 'children'>

export interface IFormTextBox {
  text?: string
  title?: TextEl
  description?: TextEl
  gutter?: number
}

export interface IRowProps extends RowProps {
  prefix?: string
  pure?: boolean
  className?: string
  style?: object
}

export interface IColProps extends ColProps {
  prefix?: string
  pure?: boolean
  className?: string
}

export interface IFormCardProps extends CardProps {
  className?: string
}

export interface IFormBlockProps extends CardProps {
  className?: string
}

export interface ISubmitProps extends Omit<ButtonProps, 'loading'> {
  showLoading?: boolean
}

export interface IFormButtonGroupProps {
  sticky?: boolean
  style?: React.CSSProperties
  itemStyle?: React.CSSProperties
  className?: string
  align?: 'left' | 'right' | 'start' | 'end' | 'top' | 'bottom' | 'center'
  triggerDistance?: number
  zIndex?: number
  span?: ColSpanType
  offset?: ColSpanType
}

export interface SchemaFormProps<V = unknown> {
  actions?: IFormActions
  initialValues?: V
  defaultValue?: V
  value?: V
  editable?: boolean | ((name: string) => boolean)
  effects?: IEffects
  locale?: ILocaleMessages
  schema?: ISchema
  onChange?: (values: V) => void
  onReset?: (values: V) => void
  onSubmit?: (values: V) => void
  onValidateFailed?: (fieldErrors: IFieldError[]) => void
  autoAddColon?: boolean
  className?: string
  inline?: boolean
  layout?: Layout
  maxTipsNum?: number
  labelAlign?: LabelAlign
  labelTextAlign?: TextAlign
  labelCol?: ColSize | number
  wrapperCol?: ColSize | number
  size?: Size
  style?: React.CSSProperties
  prefix?: string
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
