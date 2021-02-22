export enum NodeTypes {
  NON_LEAF = 'non_leaf',
  LEAF = 'leaf',
  EXTRA = 'extra',
}

export type RenderNodeFN = (
  path: string,
  type: NodeTypes,
  data?: any
) => React.ReactNode

export interface ILogicDiagramProps {
  data?: any
  childrenKey?: string
  nonLeafNodeWidth?: number
  nodeHeight?: number
  nodeMarginY?: number
  nodeMarginX?: number
  renderNode: RenderNodeFN
  linkColor?: string
  className?: string
  style?: React.CSSProperties
  innerClassName?: string
  innerStyle?: React.CSSProperties
}

export interface ILinkProps {
  source: {
    x: number
    y: number
  }
  target: {
    x: number
    y: number
  }
  highlight?: boolean
  componentHeight: number
  linkColor?: string
}
