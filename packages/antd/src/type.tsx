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

type ColSpanType = number | string

export interface ColSize {
  span?: ColSpanType
  offset?: ColSpanType
}

export interface ISchemaFormExpandProps {
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

export interface ILocaleMessages {
  [key: string]: string | ILocaleMessages
}

export interface ISchemaFormProps<V = unknown> {
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

  triggerDistance?: number
  zIndex?: number
  span?: number
  offset?: number
}

export interface ISubmitProps extends Omit<BaseButtonProps, 'loading'> {
  showLoading?: boolean
}
