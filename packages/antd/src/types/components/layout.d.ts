import { IFieldProps } from '@uform/react'

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
