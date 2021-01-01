type ReactRenderPropsChildren<T = any> =
  | React.ReactNode
  | ((props: T) => React.ReactElement)
export interface IPasswordStrengthProps {
  value?: React.ReactText
  children?: ReactRenderPropsChildren<number>
}
export interface IDragListViewProps {
  onDragEnd: (fromIndex: number, toIndex: number) => void
  handleSelector?: string
  nodeSelector?: string
  ignoreSelector?: string
}
