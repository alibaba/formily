import React from 'react'
import { hierarchy, HierarchyNode } from 'd3-hierarchy'
import { ILogicDiagramProps, NodeTypes } from '../types'
import { Link } from './Link'

export const LogicDiagram: React.FC<ILogicDiagramProps> = ({
  data,
  childrenKey = 'children',
  nonLeafNodeWidth = 100,
  nodeHeight = 40,
  nodeMarginY = 16,
  nodeMarginX = 38,
  renderNode,
  linkColor,
  className,
  style,
  innerClassName,
  innerStyle,
}) => {
  const root = hierarchy<any>(data, (d) => d[childrenKey])

  const nodes = root.descendants()
  const leaves = root.leaves()
  const links = root.links()

  const getNodeChildrenPath = (node: HierarchyNode<any>): string => {
    if (!node.parent) {
      return childrenKey
    }
    return `${getNodeChildrenPath(node.parent)}[${node.parent.children.indexOf(
      node
    )}].${childrenKey}`
  }

  const getNodePath = (node: HierarchyNode<any>) => {
    if (!node.parent) {
      return ''
    }
    return `${getNodeChildrenPath(node.parent)}[${node.parent.children.indexOf(
      node
    )}]`
  }

  const getNodeX = (node: HierarchyNode<any>) => {
    return node.depth * (nonLeafNodeWidth + nodeMarginX)
  }

  const getNodeY = (node: HierarchyNode<any>): number => {
    if (!node.children || node.children.length === 0) {
      return leaves.indexOf(node) * (nodeHeight + nodeMarginY)
    }
    return (
      (getNodeY(node.children[0]) +
        getNodeY(node.children[node.children.length - 1])) /
      2
    )
  }

  const renderNodes = () => {
    const result: React.ReactNode[] = []
    const nodeStyle: React.CSSProperties = {
      boxSizing: 'border-box',
      position: 'absolute',
    }
    nodes.forEach((node) => {
      const x = getNodeX(node)
      const y = getNodeY(node)
      const path = getNodePath(node)

      if (!node.parent) {
        // root 节点
        const rootEle = (
          <div
            key={path}
            style={{
              ...nodeStyle,
              left: x,
              top: y,
              width: nonLeafNodeWidth,
              height: nodeHeight,
            }}
          >
            {renderNode(path, NodeTypes.NON_LEAF, node.data)}
          </div>
        )
        result.push(rootEle)
      } else {
        const index = node.parent.children.indexOf(node)
        // extra 节点，定位在同级别的上下两个节点之间，或者是最上节点的顶部。常见用于作为拖拽时的目标drop节点
        const extraY =
          index === 0
            ? y - nodeMarginY
            : y -
              (y -
                (getNodeY(node.parent.children[index - 1]) + nodeHeight) +
                nodeMarginY) /
                2
        const extraEle = (
          <div
            key={`${path}-drop`}
            style={{
              ...nodeStyle,
              left: x,
              top: extraY,
              width: nonLeafNodeWidth,
              height: nodeMarginY,
            }}
          >
            {renderNode(path, NodeTypes.EXTRA, node.data)}
          </div>
        )
        result.push(extraEle)

        let ele
        if (node.children && node.children.length) {
          // 非叶子节点
          ele = (
            <div
              key={path}
              style={{
                ...nodeStyle,
                left: x,
                top: y,
                width: nonLeafNodeWidth,
                height: nodeHeight,
              }}
            >
              {renderNode(path, NodeTypes.NON_LEAF, node.data)}
            </div>
          )
        } else {
          // 叶子节点
          ele = (
            <div
              key={path}
              style={{ ...nodeStyle, left: x, top: y, height: nodeHeight }}
            >
              {renderNode(path, NodeTypes.LEAF, node.data)}
            </div>
          )
        }

        result.push(ele)
      }
    })
    return result
  }

  const renderLinks = () => {
    return links.map((link) => {
      const { source, target } = link

      return (
        <Link
          key={`${getNodePath(source)}-${getNodePath(target)}`}
          source={{
            x: getNodeX(source) + nonLeafNodeWidth,
            y: getNodeY(source),
          }}
          target={{ x: getNodeX(target), y: getNodeY(target) }}
          componentHeight={nodeHeight}
          linkColor={linkColor}
        />
      )
    })
  }

  return (
    <div
      className={className}
      style={{ padding: '20px 0', overflowX: 'auto', ...style }}
    >
      <div
        className={innerClassName}
        style={{
          boxSizing: 'border-box',
          position: 'relative',
          height:
            leaves.length * (nodeHeight + nodeMarginY) -
            nodeMarginY,
          ...innerStyle,
        }}
      >
        {renderNodes()}
        {renderLinks()}
      </div>
    </div>
  )
}
