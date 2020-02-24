export type IArrayList = React.FC<IArrayListProps> & {
  Wrapper: React.FC<IArrayListWrapperProps>
  Item: React.FC<IArrayListItemProps>
  Remove: React.FC<IArrayListRemoveProps>
  Addition: React.FC<IArrayListAdditionProps>
  MoveUp: React.FC<IArrayListMoveUpProps>
  MoveDown: React.FC<IArrayListMoveDownProps>
  Empty: React.FC<IArrayListEmptyProps>
  useComponent: (name: string) => ReactComponent
  useArrayList: (index?: number) => IArrayListProps & ArrayListInfo
}

interface ArrayListInfo {
  currentIndex: number
  isEmpty: boolean
  isDisable: boolean
  allowRemove: boolean
  allowAddition: boolean
  allowMoveDown: boolean
  allowMoveUp: boolean
  renderWith: (
    name: string,
    render: (node: any) => React.ReactElement,
    wrapper?: any
  ) => any
}

type ReactComponent = React.JSXElementConstructor<any>

type ReactRenderPropsChildren<T = any> =
  | React.ReactNode
  | ((props: T) => React.ReactElement)

export interface IArrayListProps {
  value?: any[]
  maxItems?: number
  minItems?: number
  editable?: boolean
  disabled?: boolean
  components?: {
    Wrapper?: ReactComponent
    Item?: ReactComponent
    CircleButton?: ReactComponent
    TextButton?: ReactComponent
    AdditionIcon?: ReactComponent
    RemoveIcon?: ReactComponent
    MoveDownIcon?: ReactComponent
    MoveUpIcon?: ReactComponent
  }
  renders?: {
    renderAddition?: ReactRenderPropsChildren
    renderEmpty?: ReactRenderPropsChildren
    renderMoveDown?: ReactRenderPropsChildren<number>
    renderMoveUp?: ReactRenderPropsChildren<number>
    renderRemove?: ReactRenderPropsChildren<number>
  }
  context?: any
}

export interface IArrayListWrapperProps {
  children?: ReactRenderPropsChildren
  component?: string
  [key: string]: any
}

export interface IArrayListItemProps {
  index?: number
  children?: ReactRenderPropsChildren
  component?: string
}

export interface IArrayListOperatorProps<T> {
  children?: React.ReactElement | ((method: T) => React.ReactElement)
}

export interface IPreviewTextProps {
  className?: React.ReactText
  dataSource?: any[]
  value?: any
  addonBefore?: React.ReactNode
  innerBefore?: React.ReactNode
  addonTextBefore?: React.ReactNode
  addonTextAfter?: React.ReactNode
  innerAfter?: React.ReactNode
  addonAfter?: React.ReactNode
}

export interface OperatorButtonProps {
  index?: number
  children?: ReactRenderPropsChildren<ArrayListInfo & { children: any }>
  component?: string
  onClick?: (event: any) => void
}

export interface IPasswordStrengthProps {
  value?: React.ReactText
  children?: ReactRenderPropsChildren<number>
}

export type IArrayListRemoveProps = OperatorButtonProps
export type IArrayListAdditionProps = OperatorButtonProps
export type IArrayListMoveUpProps = OperatorButtonProps
export type IArrayListMoveDownProps = OperatorButtonProps
export type IArrayListEmptyProps = IArrayListAdditionProps

export interface PreviewTextConfigProps {
  previewPlaceholder?: string | ((props: IPreviewTextProps) => string)
}

export interface IDragListViewProps {
  onDragEnd: (fromIndex: number, toIndex: number) => void
  handleSelector?: string
  nodeSelector?: string
  ignoreSelector?: string
}
