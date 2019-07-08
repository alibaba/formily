import { ISchema } from '@uform/utils'
// import { ColProps } from 'antd/lib/grid/col'

export enum LabelAlign {
  TOP = 'top',
  INSET = 'inset',
  LEFT = 'left'
}

export enum LabelTextAlign {
  LEFT = 'left',
  RIGHT = 'right'
}

export enum Size {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small'
}

export interface IFormConsumerProps {
  // labelCol: ColProps | number
  labelCol: object | number
  wrapperCol: object | number
  autoAddColon: boolean
  size: Size
  inline: boolean
  labelAlign: LabelAlign
  labelTextAlign: LabelTextAlign
}

export interface IRowProps {
  prefix?: string
  pure?: boolean
  wrap?: boolean
  fixed?: boolean
  hidden?: boolean
  gutter?: string
  className?: string

  // TODO
  fixedWidth?: string | number
  style?: object
  align?: string | number
  justify?: string | number
  component?: any
  children: React.ReactNode
}

export interface IColProps {
  prefix: string
  pure?: boolean
  className?: string
  span?: string | number
  offset?: string | number
  fixedSpan?: string | number
  fixedOffset?: string | number
  hidden?: boolean

  // TODO
  align?: any
  xxs?: any
  xs?: any
  s?: any
  m?: any
  l?: any
  xl?: any
  component?: any
  children?: React.ReactNode
}

export interface IFormItemGridProps {
  name?: string
  help?: React.ReactNode
  extra?: React.ReactNode
  description?: string
  title?: string
  cols?: any
}

export interface IFormCardProps {
  className?: string
}

export interface IFormBlockProps {
  className?: string
}

export interface IFormProps extends IFormConsumerProps {
  className: string
  style: object
  layout: string
  children: React.ReactNode
  component: string
  prefix: string
  maxTipsNum: number
  onValidateFailed: () => void
}

export interface IFormItemProps extends IFormConsumerProps {
  id: string
  required: boolean
  label: React.ReactNode
  prefix: string
  extra: object
  maxTipsNum: number

  // TODO
  validateState: any

  isTableColItem: boolean
  help: React.ReactNode
  noMinHeight: boolean
  children: React.ReactElement
  className: string
  style: object
  type: string
  schema: ISchema
}
