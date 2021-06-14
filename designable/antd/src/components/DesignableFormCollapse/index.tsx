import React, { Fragment, useState } from 'react'
import { observer } from '@formily/react'
import { Collapse } from 'antd'
import { CollapseProps, CollapsePanelProps } from 'antd/lib/collapse'
import {
  useDesigner,
  useTreeNode,
  useNodeIdProps,
  TreeNodeWidget,
} from '@designable/react'
import { toArr } from '@formily/shared'
import { Droppable } from '../Droppable'
import { TreeNode, AppendNodeEvent } from '@designable/core'
import { LoadTemplate } from '../LoadTemplate'

const parseCollpase = (parent: TreeNode) => {
  const tabs: TreeNode[] = []
  parent.children.forEach((node) => {
    if (node.props['x-component'] === 'FormCollapse.CollapsePanel') {
      tabs.push(node)
    }
  })
  return tabs
}

const getCorrectActiveKey = (
  activeKey: string[] | string,
  tabs: TreeNode[]
) => {
  if (tabs.length === 0 || activeKey?.length === 0) return []
  if (
    tabs.some((node) =>
      Array.isArray(activeKey)
        ? activeKey.includes(node.id)
        : node.id === activeKey
    )
  )
    return activeKey
  return tabs[tabs.length - 1].id
}

export const DesignableFormCollapse: React.FC<CollapseProps> & {
  CollapsePanel?: React.FC<CollapsePanelProps>
} = observer((props) => {
  const [activeKey, setActiveKey] = useState<string | string[]>([])
  const node = useTreeNode()
  const nodeId = useNodeIdProps()
  const designer = useDesigner((designer) => {
    return designer.subscribeTo(AppendNodeEvent, (event) => {
      const { source, target } = event.data
      if (Array.isArray(target)) return
      if (!Array.isArray(source)) return
      if (target.props['x-component'] === 'FormCollapse') {
        if (
          source.every(
            (node) => node.props['x-component'] !== 'FormCollapse.CollapsePanel'
          )
        ) {
          const paneNode = new TreeNode({
            componentName: 'DesignableField',
            props: {
              type: 'void',
              'x-component': 'FormCollapse.CollapsePanel',
            },
          })
          target.appendNode(paneNode)
          paneNode.appendNode(...source)
          setActiveKey(toArr(activeKey).concat(paneNode.id))
        }
      }
    })
  })
  const panels = parseCollpase(node)
  const renderCollapse = () => {
    if (!node.children?.length) return <Droppable {...props} />
    return (
      <Collapse
        {...props}
        activeKey={getCorrectActiveKey(activeKey, panels)}
        onChange={(id) => {
          setActiveKey(toArr(id))
        }}
      >
        {panels.map((panel) => {
          const props = panel.props['x-component-props'] || {}
          return (
            <Collapse.Panel
              {...props}
              style={{ ...props.style }}
              header={props.header || `Unnamed Title`}
              key={panel.id}
            >
              {React.createElement(
                'div',
                {
                  [designer.props.nodeIdAttrName]: panel.id,
                },
                panel.children.length ? (
                  <TreeNodeWidget node={panel} />
                ) : (
                  <Droppable />
                )
              )}
            </Collapse.Panel>
          )
        })}
      </Collapse>
    )
  }
  return (
    <div {...nodeId}>
      {renderCollapse()}
      <LoadTemplate
        actions={[
          {
            title: 'addCollapsePanel',
            onClick: () => {
              const tabPane = new TreeNode({
                componentName: 'DesignableField',
                props: {
                  type: 'void',
                  'x-component': 'FormCollapse.CollapsePanel',
                },
              })
              node.appendNode(tabPane)
              const keys = toArr(activeKey)
              setActiveKey(keys.concat(tabPane.id))
            },
          },
        ]}
      />
    </div>
  )
})

DesignableFormCollapse.CollapsePanel = (props) => {
  return <Fragment>{props.children}</Fragment>
}
