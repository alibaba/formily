import { CardProps } from '@alifd/next/types/card'
import { RowProps, ColProps } from '@alifd/next/types/grid'

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
