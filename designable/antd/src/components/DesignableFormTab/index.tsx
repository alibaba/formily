import React, { Fragment, useState } from 'react'
import { observer } from '@formily/react'
import { Tabs } from 'antd'
import { TabsProps, TabPaneProps } from 'antd/lib/tabs'
import {
  useDesigner,
  useNodeIdProps,
  useTreeNode,
  TreeNodeWidget,
} from '@designable/react'
import { Droppable } from '../Droppable'
import { TreeNode, AppendNodeEvent } from '@designable/core'
import { LoadTemplate } from '../LoadTemplate'

const parseTabs = (parent: TreeNode) => {
  const tabs: TreeNode[] = []
  parent.children.forEach((node) => {
    if (node.props['x-component'] === 'FormTab.TabPane') {
      tabs.push(node)
    }
  })
  return tabs
}

const getCorrectActiveKey = (activeKey: string, tabs: TreeNode[]) => {
  if (tabs.length === 0) return
  if (tabs.some((node) => node.id === activeKey)) return activeKey
  return tabs[tabs.length - 1].id
}

export const DesignableFormTab: React.FC<TabsProps> & {
  TabPane?: React.FC<TabPaneProps>
} = observer((props) => {
  const [activeKey, setActiveKey] = useState<string>()
  const nodeId = useNodeIdProps()
  const node = useTreeNode()
  const designer = useDesigner((designer) => {
    return designer.subscribeTo(AppendNodeEvent, (event) => {
      const { source, target } = event.data
      if (Array.isArray(target)) return
      if (!Array.isArray(source)) return
      if (target.props['x-component'] === 'FormTab') {
        if (
          source.every(
            (node) => node.props['x-component'] !== 'FormTab.TabPane'
          )
        ) {
          const paneNode = new TreeNode({
            componentName: 'DesignableField',
            props: {
              type: 'void',
              'x-component': 'FormTab.TabPane',
            },
          })
          target.appendNode(paneNode)
          paneNode.appendNode(...source)
        }
      }
    })
  })
  const tabs = parseTabs(node)
  const renderTabs = () => {
    if (!node.children?.length) return <Droppable />
    return (
      <Tabs
        {...props}
        activeKey={getCorrectActiveKey(activeKey, tabs)}
        onChange={(id) => {
          setActiveKey(id)
        }}
      >
        {tabs.map((tab) => {
          const props = tab.props['x-component-props'] || {}
          return (
            <Tabs.TabPane
              {...props}
              style={{ ...props.style }}
              tab={props.tab || `Unnamed Title`}
              key={tab.id}
            >
              {React.createElement(
                'div',
                {
                  [designer.props.nodeIdAttrName]: tab.id,
                },
                tab.children.length ? (
                  <TreeNodeWidget node={tab} />
                ) : (
                  <Droppable />
                )
              )}
            </Tabs.TabPane>
          )
        })}
      </Tabs>
    )
  }
  return (
    <div {...nodeId}>
      {renderTabs()}
      <LoadTemplate
        actions={[
          {
            title: 'addTabPane',
            onClick: () => {
              const tabPane = new TreeNode({
                componentName: 'DesignableField',
                props: {
                  type: 'void',
                  'x-component': 'FormTab.TabPane',
                },
              })
              node.appendNode(tabPane)
              setActiveKey(tabPane.id)
            },
          },
        ]}
      />
    </div>
  )
})

DesignableFormTab.TabPane = (props) => {
  return <Fragment>{props.children}</Fragment>
}
