import { ColProps } from 'antd/es/col'
import { CardProps } from 'antd/es/card'
import { BaseButtonProps } from 'antd/es/button/button'

export type TTextAlign = 'left' | 'right'
export type TSize = 'small' | 'medium' | 'large'
export type TTextEl = string | JSX.Element | null

export interface ISubmitProps extends Omit<BaseButtonProps, 'loading'> {
  showLoading?: boolean
}

export interface IFormLayoutProps {
  className?: string
  inline?: boolean
  labelAlign?: 'left' | 'top' | 'inset'
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
  title?: TTextEl
  description?: TTextEl
  gutter?: number
}

export interface IFormButtonGroupProps {
  sticky?: boolean
  style?: React.CSSProperties
  itemStyle?: React.CSSProperties
  className?: string

  triggerDistance?: number
  offsetDistance?: any
  zIndex?: number
  span?: number
  offset?: number
}
