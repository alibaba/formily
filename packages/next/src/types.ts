import { ButtonProps } from '@alifd/next/types/button'
import { FormProps, ItemProps } from '@alifd/next/types/form'
import {
  ISchemaFormProps,
  IMarkupSchemaFieldProps
} from '@uform/react-schema-renderer'
import { StyledComponent } from 'styled-components'

type ColSpanType = number | string

export type INextSchemaFormProps = ISchemaFormProps &
  FormProps &
  IFormItemTopProps

export type INextSchemaFieldProps = IMarkupSchemaFieldProps

export interface ISubmitProps extends ButtonProps {
  onSubmit?: ISchemaFormProps['onSubmit']
  showLoading?: boolean
}

export interface IResetProps extends ButtonProps {
  forceClear?: boolean
  validate?: boolean
}

export type IFormItemTopProps = Pick<
  ItemProps,
  | 'prefix'
  | 'labelCol'
  | 'wrapperCol'
  | 'labelAlign'
  | 'labelTextAlign'
  | 'size'
> & {
  inline?: boolean
}

export type StyledCP<P extends {}> = StyledComponent<
  (props: React.PropsWithChildren<P>) => React.ReactElement,
  any,
  {},
  never
>

export type StyledCC<Props, Statics = {}> = StyledCP<Props> & Statics

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

export interface IFormItemGridProps {
  cols?: Array<number | { span: number; offset: number }>
  description?: React.ReactText
  gutter?: number
  title?: React.ReactText
}
