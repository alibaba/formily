import React, { Fragment, useState } from 'react'
import { observer } from '@formily/react'
import { Collapse } from 'antd'
import { CollapseProps, CollapsePanelProps } from 'antd/lib/collapse'
import { useTreeNode, useNodeIdProps, TreeNodeWidget } from '@designable/react'
import { toArr } from '@formily/shared'
import { Droppable } from '../Droppable'
import { TreeNode } from '@designable/core'
import { LoadTemplate } from '../LoadTemplate'
import { useDropTemplate } from '../../hooks'
import { matchComponent } from '../../shared'

const parseCollpase = (parent: TreeNode) => {
  const tabs: TreeNode[] = []
  parent.children.forEach((node) => {
    if (matchComponent(node, 'FormCollapse.CollapsePanel')) {
      tabs.push(node)
    }
  })
  return tabs
}

export const DesignableFormCollapse: React.FC<CollapseProps> & {
  CollapsePanel?: React.FC<CollapsePanelProps>
} = observer((props) => {
  const [activeKey, setActiveKey] = useState<string | string[]>([])
  const node = useTreeNode()
  const nodeId = useNodeIdProps()
  const designer = useDropTemplate('FormCollapse', (source) => {
    const panelNode = new TreeNode({
      componentName: 'DesignableField',
      props: {
        type: 'void',
        'x-component': 'FormCollapse.CollapsePanel',
        'x-component-props': {
          header: `Unnamed Title`,
        },
      },
      children: source,
    })

    setActiveKey(toArr(activeKey).concat(panelNode.id))
    return [panelNode]
  })
  const getCorrectActiveKey = (
    activeKey: string[] | string,
    tabs: TreeNode[]
  ) => {
    if (!tabs.length || !activeKey?.length) {
      if (props.accordion) {
        return tabs[0]?.id
      }
      return tabs.map((item) => item.id)
    }
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
              header={props.header}
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
            title: 'Common.addCollapsePanel',
            onClick: () => {
              const tabPane = new TreeNode({
                componentName: 'DesignableField',
                props: {
                  type: 'void',
                  'x-component': 'FormCollapse.CollapsePanel',
                  'x-component-props': {
                    header: `Unnamed Title`,
                  },
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
