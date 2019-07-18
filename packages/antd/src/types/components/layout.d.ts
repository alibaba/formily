export interface IFormLayoutProps {
  className?: string
  inline?: boolean
  labelAlign?: 'left' | 'top' | 'inset'
  wrapperCol?: number
  labelCol?: number
  labelTextAlign?: 'left' | 'right'
  size?: 'small' | 'medium' | 'large'
  style?: React.CSSProperties
  children: React.ReactNode
}

export type TFormLayout = ({
  children,
  ...props
}: IFormLayoutProps) => JSX.Element
