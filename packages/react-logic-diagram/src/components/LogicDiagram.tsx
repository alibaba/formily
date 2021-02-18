import React, { useMemo } from 'react'
import { hierarchy, HierarchyNode } from 'd3-hierarchy'
import { ILogicDiagramProps, NodeTypes } from '../types'
import { Link } from './Link'

const ACTION_TYPE = Symbol('ACTION')

export const LogicDiagram: React.FC<ILogicDiagramProps> = ({
  data,
  disabled,
  childrenKey = 'children',
  nonLeafNodeWidth = 100,
  nodeHeight = 40,
  nodeSpaceVertical = 16,
  nodeSpaceHorizontal = 38,
  renderNode,
  linkColor,
  className,
  style,
  innerClassName,
  innerStyle,
}) => {
  const patchActionNodes = (nodes: any[]): any[] => {
    if (disabled) {
      return nodes
    }
    return [
      ...nodes.map((node) => {
        if (!node[childrenKey] || node[childrenKey].length === 0) {
          return node
        }
        return {
          ...node,
          [childrenKey]: patchActionNodes(node[childrenKey]),
        }
      }),
      {
        [ACTION_TYPE]: true,
      },
    ]
  }

  const root = useMemo(() => {
    const finalValue = {
      ...data,
      [childrenKey]: patchActionNodes(data?.[childrenKey] ?? []),
    }
    return hierarchy<any>(finalValue, (d) => d[childrenKey])
  }, [data, disabled, childrenKey])

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
    return node.depth * (nonLeafNodeWidth + nodeSpaceHorizontal)
  }

  const getNodeY = (node: HierarchyNode<any>): number => {
    if (!node.children || node.children.length === 0) {
      return leaves.indexOf(node) * (nodeHeight + nodeSpaceVertical)
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
            {renderNode(path, NodeTypes.RELATION, node.data)}
          </div>
        )
        result.push(rootEle)
      } else {
        const index = node.parent.children.indexOf(node)
        if (!disabled) {
          // drop 节点
          const dropY =
            index === 0
              ? y - nodeSpaceVertical
              : y -
                (y -
                  (getNodeY(node.parent.children[index - 1]) + nodeHeight) +
                  nodeSpaceVertical) /
                  2
          const dropEle = (
            <div
              key={`${path}-drop`}
              style={{
                ...nodeStyle,
                left: x,
                top: dropY,
                width: nonLeafNodeWidth,
                height: nodeSpaceVertical,
              }}
            >
              {renderNode(path, NodeTypes.DROP, node.data)}
            </div>
          )
          result.push(dropEle)
        }

        let ele
        if (node.data[ACTION_TYPE]) {
          // action 节点
          ele = (
            <div
              key={path}
              style={{ ...nodeStyle, left: x, top: y, height: nodeHeight }}
            >
              {renderNode(path, NodeTypes.ACTION, node.data)}
            </div>
          )
        } else if (node.children && node.children.length) {
          // relation 节点
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
              {renderNode(path, NodeTypes.RELATION, node.data)}
            </div>
          )
        } else {
          // rule 节点
          ele = (
            <div
              key={path}
              style={{ ...nodeStyle, left: x, top: y, height: nodeHeight }}
            >
              {renderNode(path, NodeTypes.RULE, node.data)}
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
            leaves.length * (nodeHeight + nodeSpaceVertical) -
            nodeSpaceVertical,
          ...innerStyle,
        }}
      >
        {renderNodes()}
        {renderLinks()}
      </div>
    </div>
  )
}
