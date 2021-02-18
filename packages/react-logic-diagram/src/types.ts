export enum NodeTypes {
  RELATION = 'relation',
  RULE = 'rule',
  ACTION = 'action',
  DROP = 'drop',
}

export type RenderNodeFN = (
  path: string,
  type: NodeTypes,
  data?: any
) => React.ReactNode

export interface ILogicDiagramProps {
  data?: any
  disabled?: boolean
  childrenKey?: string
  nonLeafNodeWidth?: number
  nodeHeight?: number
  nodeSpaceVertical?: number
  nodeSpaceHorizontal?: number
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
