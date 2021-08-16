import React, { Fragment, useState } from 'react'
import { observer } from '@formily/react'
import { Tabs } from 'antd'
import { TabsProps, TabPaneProps } from 'antd/lib/tabs'
import { useNodeIdProps, useTreeNode, TreeNodeWidget } from '@designable/react'
import { Droppable } from '../Droppable'
import { TreeNode } from '@designable/core'
import { LoadTemplate } from '../LoadTemplate'
import { useDropTemplate } from '../../hooks'
import { matchComponent } from '../../shared'

const parseTabs = (parent: TreeNode) => {
  const tabs: TreeNode[] = []
  parent.children.forEach((node) => {
    if (matchComponent(node, 'FormTab.TabPane')) {
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
  const designer = useDropTemplate('FormTab', (source) => {
    return [
      new TreeNode({
        componentName: 'DesignableField',
        props: {
          type: 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': {
            tab: `Unnamed Title`,
          },
        },
        children: source,
      }),
    ]
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
              tab={props.tab}
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
            title: 'Common.addTabPane',
            onClick: () => {
              const tabPane = new TreeNode({
                componentName: 'DesignableField',
                props: {
                  type: 'void',
                  'x-component': 'FormTab.TabPane',
                  'x-component-props': {
                    tab: `Unnamed Title`,
                  },
                },
              })
              node.append(tabPane)
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
