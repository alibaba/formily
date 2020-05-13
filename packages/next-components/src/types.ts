import { ButtonProps } from '@alifd/next/types/button'
import { FormProps, ItemProps } from '@alifd/next/types/form'
import { StepProps, ItemProps as StepItemProps } from '@alifd/next/types/step'
import { TabProps } from '@alifd/next/types/tab'
import { ColumnProps } from '@alifd/next/types/table'
import {
  ISchemaFormProps,
  IMarkupSchemaFieldProps,
  ISchemaFieldComponentProps,
  FormPathPattern
} from '@formily/react-schema-renderer'
import { PreviewTextConfigProps } from '@formily/react-shared-components'
import { StyledComponent } from 'styled-components'

type ColSpanType = number | string

export type INextSchemaFormProps = Omit<
  FormProps,
  'onSubmit' | 'defaultValue'
> &
  IFormItemTopProps &
  PreviewTextConfigProps &
  ISchemaFormProps

export type INextSchemaFieldProps = IMarkupSchemaFieldProps

export interface ISubmitProps extends ButtonProps {
  onSubmit?: ISchemaFormProps['onSubmit']
  showLoading?: boolean
}

export interface IResetProps extends ButtonProps {
  forceClear?: boolean
  validate?: boolean
}

export type IFormItemTopProps = React.PropsWithChildren<
  Exclude<
    Pick<
      ItemProps,
      | 'prefix'
      | 'labelCol'
      | 'wrapperCol'
      | 'labelAlign'
      | 'labelTextAlign'
      | 'size'
    >,
    'labelCol' | 'wrapperCol'
  > & {
    inline?: boolean
    className?: string
    style?: React.CSSProperties
    labelCol?: number | { span: number; offset?: number }
    wrapperCol?: number | { span: number; offset?: number }
  }
>

export interface ISchemaFieldAdaptorProps
  extends Omit<ItemProps, 'labelCol' | 'wrapperCol'>,
    Partial<ISchemaFieldComponentProps> {
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

export interface IFormTab extends TabProps {
  hiddenKeys?: string[]
}

export type IDragHandlerCellProps = React.PropsWithChildren<{}>

export interface IDragableRowProps {
  columns: ColumnProps[]
  className?: string
}
