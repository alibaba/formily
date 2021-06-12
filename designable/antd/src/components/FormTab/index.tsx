import React, { Fragment, useState } from 'react'
import { observer } from '@formily/react'
import { Tabs, Button } from 'antd'
import { TabsProps, TabPaneProps } from 'antd/lib/tabs'
import {
  useDesigner,
  useNodeIdProps,
  useTreeNode,
  TreeNodeWidget,
} from '@designable/react'
import { Droppable } from '../Droppable'
import { TreeNode, AppendNodeEvent, GlobalRegistry } from '@designable/core'
import { PlusOutlined } from '@ant-design/icons'

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

export const FormTab: React.FC<TabsProps> & {
  TabPane?: React.FC<TabPaneProps>
} = observer((props) => {
  const [activeKey, setActiveKey] = useState<string>()
  const nodeId = useNodeIdProps()
  const node = useTreeNode()
  const designer = useDesigner((designer) => {
    designer.subscribeTo(AppendNodeEvent, (event) => {
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
  if (!node.children?.length) return <Droppable {...props} />
  const tabs = parseTabs(node)
  return (
    <div {...nodeId}>
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
                  style: {
                    paddingTop: 10,
                    paddingBottom: 10,
                  },
                },
                tab.children.length ? (
                  <TreeNodeWidget node={tab} />
                ) : (
                  <Droppable style={{ marginBottom: 20 }} />
                )
              )}
            </Tabs.TabPane>
          )
        })}
      </Tabs>
      <Button
        block
        type="dashed"
        data-click-stop-propagation="true"
        style={{ marginTop: 10 }}
        onClick={() => {
          const tabPane = new TreeNode({
            componentName: 'DesignableField',
            props: {
              type: 'void',
              'x-component': 'FormTab.TabPane',
            },
          })
          node.appendNode(tabPane)
          setActiveKey(tabPane.id)
        }}
      >
        <PlusOutlined />
        {GlobalRegistry.getDesignerMessage('addTabPane')}
      </Button>
    </div>
  )
})

FormTab.TabPane = (props) => {
  return <Fragment>{props.children}</Fragment>
}
