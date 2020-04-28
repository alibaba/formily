import { ButtonProps } from 'antd/lib/button'
import { FormProps, FormItemProps as ItemProps } from 'antd/lib/form'
import { ColProps } from 'antd/lib/grid'
import {
  StepsProps as StepProps,
  StepProps as StepItemProps
} from 'antd/lib/steps'
import {
  ISchemaFormProps,
  IMarkupSchemaFieldProps,
  ISchemaFieldComponentProps,
  FormPathPattern,
  IFormProps,
  IFieldStateUIProps
} from '@formily/react-schema-renderer'
import { PreviewTextConfigProps } from '@formily/react-shared-components'
import { StyledComponent } from 'styled-components'
export * from '@formily/react-schema-renderer'

type ColSpanType = number | string

export type IAntdSchemaFormProps = Omit<
  FormProps,
  'onSubmit' | 'defaultValue' | 'labelCol' | 'wrapperCol'
> &
  IFormItemTopProps &
  PreviewTextConfigProps &
  ISchemaFormProps

export type IAntdSchemaFieldProps = IMarkupSchemaFieldProps

export type IAntdFormProps = Omit<
  FormProps,
  'onSubmit' | 'defaultValue' | 'labelCol' | 'wrapperCol'
> &
  IFormItemTopProps &
  IFormProps<any, any>

export type IAntdFormItemProps = IFieldStateUIProps &
  Omit<ItemProps, 'children'> & {
    valueName?: string
    eventName?: string
    component?: React.JSXElementConstructor<any>
    children?: React.ReactNode
    itemStyle?: {
      [key: string]: string | number
    }
    itemClassName?: string
    [key: string]: any
  }

export interface ISubmitProps extends ButtonProps {
  onSubmit?: ISchemaFormProps['onSubmit']
  showLoading?: boolean
}

export interface IResetProps extends ButtonProps {
  forceClear?: boolean
  validate?: boolean
}

export type IFormItemTopProps = React.PropsWithChildren<
  Pick<ItemProps, 'prefixCls' | 'labelAlign'> & {
    inline?: boolean
    className?: string
    style?: React.CSSProperties
    labelCol?: number | { span: number; offset?: number } | ColProps
    wrapperCol?: number | { span: number; offset?: number } | ColProps
  }
>

export type ISchemaFieldAdaptorProps = Omit<
  ItemProps,
  'labelCol' | 'wrapperCol'
> &
  Partial<ISchemaFieldComponentProps> & {
    labelCol?: number | { span: number; offset?: number }
    wrapperCol?: number | { span: number; offset?: number }
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

export interface IItemProps {
  title?: React.ReactText
  description?: React.ReactText
}

export interface IFormItemGridProps extends IItemProps {
  cols?: Array<number | { span: number; offset: number }>
  gutter?: number
}

export interface IFormTextBox extends IItemProps {
  text?: string
  gutter?: number
}

export interface IFormStep extends StepProps {
  dataSource: Array<StepItemProps & { name: FormPathPattern }>
}
