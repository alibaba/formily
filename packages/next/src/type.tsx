import { ButtonProps } from '@alifd/next/types/button'
import { CardProps } from '@alifd/next/types/card'
import { RowProps, ColProps } from '@alifd/next/types/grid'
import { IFormActions, ISchema, IEffects, IFieldError } from '@uform/types'

export type TTextAlign = 'left' | 'right'
export type TSize = 'small' | 'medium' | 'large'
export type TLayout = 'horizontal' | 'vertical' | 'inline'
export type TTextEl = string | JSX.Element | null
export type TLabelAlign = 'left' | 'top' | 'inset'

type ColSpanType = number | string

export interface ColSize {
  span?: ColSpanType
  offset?: ColSpanType
}

export interface ISchemaFormExpandProps {
  autoAddColon?: boolean
  className?: string
  inline?: boolean
  layout?: TLayout
  maxTipsNum?: number
  labelAlign?: TLabelAlign
  labelTextAlign?: TTextAlign
  labelCol?: ColSize | number
  wrapperCol?: ColSize | number
  size?: TSize
  style?: React.CSSProperties
  prefix?: string
}

export interface ISchemaFormProps<V = unknown> {
  actions?: IFormActions
  initialValues?: V
  defaultValue?: V
  value?: V
  editable?: (name: string) => boolean | boolean
  effects?: IEffects
  locale?: {
    [key: string]: {
      [k in string]: string | number
    }
  }
  schema?: ISchema
  onChange?: (values: V) => void
  onReset?: (values: V) => void
  onSubmit?: (values: V) => void
  onValidateFailed?: (fieldErrors: IFieldError[]) => void
}

export interface IFormLayoutProps {
  className?: string
  inline?: boolean
  labelAlign?: TLabelAlign
  wrapperCol?: number
  labelCol?: number
  labelTextAlign?: TTextAlign
  size?: TSize
  style?: React.CSSProperties
}

export interface IFormItemGridProps {
  cols?: Array<number | { span: number; offset: number }>
  description?: TTextEl
  gutter?: number
  title?: TTextEl
}

export type TFormCardOrFormBlockProps = Omit<CardProps, 'children'>

export interface IFormTextBox {
  text?: string
  title?: TTextEl
  description?: TTextEl
  gutter?: number
}

export interface IRowProps extends RowProps {
  prefix?: string
  pure?: boolean
  className?: string
  style?: object
}

export interface IColProps extends ColProps {
  prefix: string
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
