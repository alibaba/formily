import { ISchema } from '@uform/utils'
import { CardProps } from '@alifd/next/types/card'
import { RowProps, ColProps } from '@alifd/next/types/grid'

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
  labelCol: object | number
  wrapperCol: object | number
  autoAddColon: boolean
  size: Size
  inline: boolean
  labelAlign: LabelAlign
  labelTextAlign: LabelTextAlign
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

export interface IFormItemGridProps {
  name?: string
  help?: React.ReactNode
  extra?: React.ReactNode
  description?: string
  title?: string
  cols?: any
}

export interface IFormCardProps extends CardProps {
  className?: string
}

export interface IFormBlockProps extends CardProps {
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
