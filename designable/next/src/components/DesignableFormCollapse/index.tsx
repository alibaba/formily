import React, { Fragment, useState } from 'react'
import { observer } from '@formily/react'
import { toArr } from '@formily/shared'
import { Collapse } from '@alifd/next'
import type {
  CollapseProps,
  PanelProps as CollapsePanelProps,
} from '@alifd/next/types/collapse'
import { useTreeNode, useNodeIdProps, TreeNodeWidget } from '@designable/react'
import { Droppable } from '../Droppable'
import { TreeNode } from '@designable/core'
import { LoadTemplate } from '../LoadTemplate'
import { useDropTemplate } from '../../hooks'
import { matchComponent } from '../../shared'

const parseCollpase = (parent: TreeNode) => {
  const panels: TreeNode[] = []
  parent.children.forEach((node) => {
    if (matchComponent(node, 'FormCollapse.CollapsePanel')) {
      panels.push(node)
    }
  })
  return panels
}

export const DesignableFormCollapse: React.FC<CollapseProps> & {
  CollapsePanel?: React.FC<CollapsePanelProps>
} = observer((props) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  const node = useTreeNode()
  const nodeId = useNodeIdProps()
  const designer = useDropTemplate('FormCollapse', (source) => {
    const panelNode = new TreeNode({
      componentName: 'DesignableField',
      props: {
        type: 'void',
        'x-component': 'FormCollapse.CollapsePanel',
        'x-component-props': {
          title: `Unnamed Title`,
        },
      },
      children: source,
    })

    setExpandedKeys([...expandedKeys, panelNode.id])
    return [panelNode]
  })

  const panels = parseCollpase(node)

  const renderCollapse = () => {
    if (!node.children?.length) return <Droppable {...props} />
    return (
      <Collapse
        {...props}
        expandedKeys={expandedKeys}
        onExpand={(expandedKeys) => {
          setExpandedKeys(toArr(expandedKeys))
        }}
      >
        {panels.map((panel) => {
          const props = panel.props['x-component-props'] || {}
          return (
            <Collapse.Panel
              {...props}
              style={{ ...props.style }}
              title={props.title}
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
              const collapsePanel = new TreeNode({
                componentName: 'DesignableField',
                props: {
                  type: 'void',
                  'x-component': 'FormCollapse.CollapsePanel',
                  'x-component-props': {
                    title: `Unnamed Title`,
                  },
                },
              })
              node.appendNode(collapsePanel)
              setExpandedKeys([...expandedKeys, collapsePanel.id])
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
