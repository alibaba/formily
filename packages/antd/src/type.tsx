import { ColProps } from 'antd/es/col'
import { CardProps } from 'antd/es/card'
import { BaseButtonProps } from 'antd/es/button/button'
import {
  IFormActions,
  ISchema,
  IEffects,
  IFieldError,
  TextAlign,
  Size,
  Layout,
  TextEl,
  LabelAlign,
  IAsyncFormActions
} from '@uform/types'
import { SwitchProps } from 'antd/lib/switch'
import { CheckboxGroupProps } from 'antd/lib/checkbox'
import {
  DatePickerProps,
  RangePickerProps,
  MonthPickerProps,
  WeekPickerProps
} from 'antd/lib/date-picker/interface'
import { InputNumberProps } from 'antd/lib/input-number'
import { IPasswordProps } from './fields/password'
import { RadioGroupProps } from 'antd/lib/radio'
import { ISliderProps } from './fields/range'
import { RateProps } from 'antd/lib/rate'
import { InputProps } from 'antd/lib/input'
import { TextAreaProps } from 'antd/es/input'
import { TimePickerProps } from 'antd/lib/time-picker'
import { TransferProps } from 'antd/lib/transfer'
import { IUploaderProps } from './fields/upload'
import { SelectProps } from 'antd/lib/select'

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
  wrapperCol?: ColProps | number
  labelCol?: ColProps | number
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

export interface IRowProps {
  prefix?: string
  pure?: boolean
  wrap?: boolean
  fixed?: boolean
  hidden?: boolean
  className?: string
  fixedWidth?: string | number
  style?: React.CSSProperties
  component?: keyof JSX.IntrinsicElements | React.ComponentType<any>
  gutter?: string
  align?: string | number
  justify?: string | number
  children: React.ReactNode
}

export interface IColProps extends ColProps {
  prefix?: string
  pure?: boolean
  className?: string
  fixedSpan?: string | number
  fixedOffset?: string | number
  hidden?: boolean
  align?: any
  component?: keyof JSX.IntrinsicElements | React.ComponentType<any>
  children?: React.ReactNode
  xxs?: ColSpanType | ColSize
  xs?: ColSpanType | ColSize
  s?: ColSpanType | ColSize
  m?: ColSpanType | ColSize
  l?: ColSpanType | ColSize
  xl?: ColSpanType | ColSize
}

export interface IFormCardProps extends CardProps {
  className?: string
}

export interface IFormBlockProps extends CardProps {
  className?: string
}

export type TFormCardOrFormBlockProps = Omit<CardProps, 'children'>

export interface IFormTextBox {
  text?: string
  name?: string
  title?: TextEl
  description?: TextEl
  gutter?: number
  required?: boolean
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

export interface ISubmitProps extends Omit<BaseButtonProps, 'loading'> {
  showLoading?: boolean
}

export interface SchemaFormProps<V = unknown> {
  actions?: IFormActions | IAsyncFormActions
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
  week: WeekPickerProps
  year: DatePickerProps
  number: InputNumberProps | SelectProps
  password: IPasswordProps
  radio: RadioGroupProps
  range: ISliderProps
  rating: RateProps
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
