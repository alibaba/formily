import { IFieldProps } from '@uform/react'
import { ColProps } from 'antd/es/col'
import { CardProps } from 'antd/es/card'
import { BaseButtonProps } from 'antd/es/button/button'

export interface ISubmitProps extends Omit<BaseButtonProps, 'loading'> {
  showLoading?: boolean
}

export interface IFormLayoutProps {
  className: string
  inline: boolean
  labelAlign: 'left' | 'top' | 'inset'
  wrapperCol: number
  labelCol: number
  labelTextAlign: 'left' | 'right'
  size: 'small' | 'medium' | 'large'
  style: React.CSSProperties
  name: string
  render: (fieldProps: IFieldProps) => string | JSX.Element | null
}

export type TFormLayout = React.FunctionComponent<Partial<IFormLayoutProps>>

export interface IRowProps {
  prefix?: string
  pure?: boolean
  wrap?: boolean
  fixed?: boolean
  hidden?: boolean
  className?: string
  fixedWidth?: string | number
  style?: React.CSSProperties
  component?: any
  gutter?: string
  align?: string | number
  justify?: string | number
  children: React.ReactNode
}

type ColSpanType = number | string

export interface ColSize {
  span?: ColSpanType
  offset?: ColSpanType
}

export interface IColProps extends ColProps {
  prefix: string
  pure?: boolean
  className?: string
  fixedSpan?: string | number
  fixedOffset?: string | number
  hidden?: boolean
  align?: any
  component?: any
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
