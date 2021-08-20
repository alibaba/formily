import React from 'react'
import { Table } from '@alifd/next'
import { TableProps } from '@alifd/next/types/table'
import { Droppable } from '../Droppable'
import { TreeNode } from '@designable/core'
import { useTreeNode, TreeNodeWidget, useNodeIdProps } from '@designable/react'
import { ArrayBase } from '@formily/next'
import { observer } from '@formily/react'
import { LoadTemplate } from '../LoadTemplate'
import cls from 'classnames'
import {
  createNodeId,
  queryNodesByComponentPath,
  hasNodeByComponentPath,
  findNodeByComponentPath,
  createEnsureTypeItemsNode,
} from '../../shared'
import { useDropTemplate } from '../../hooks'
import './styles.less'

const ensureObjectItemsNode = createEnsureTypeItemsNode('object')

export const DesignableArrayTable: React.FC<TableProps> = observer((props) => {
  const node = useTreeNode()
  const nodeId = useNodeIdProps()
  const designer = useDropTemplate('ArrayTable', (source) => {
    const indexNode = new TreeNode({
      componentName: 'DesignableField',
      props: {
        type: 'void',
        'x-component': 'ArrayTable.Column',
        'x-component-props': {
          title: `Title`,
        },
      },
      children: [
        {
          componentName: 'DesignableField',
          props: {
            type: 'void',
            'x-component': 'ArrayTable.Index',
          },
        },
      ],
    })
    const columnNode = new TreeNode({
      componentName: 'DesignableField',
      props: {
        type: 'void',
        'x-component': 'ArrayTable.Column',
        'x-component-props': {
          title: `Title`,
        },
      },
      children: source.map((node) => {
        node.props.title = undefined
        return node
      }),
    })

    const operationNode = new TreeNode({
      componentName: 'DesignableField',
      props: {
        type: 'void',
        'x-component': 'ArrayTable.Column',
        'x-component-props': {
          title: `Title`,
        },
      },
      children: [
        {
          componentName: 'DesignableField',
          props: {
            type: 'void',
            'x-component': 'ArrayTable.Remove',
          },
        },
        {
          componentName: 'DesignableField',
          props: {
            type: 'void',
            'x-component': 'ArrayTable.MoveDown',
          },
        },
        {
          componentName: 'DesignableField',
          props: {
            type: 'void',
            'x-component': 'ArrayTable.MoveUp',
          },
        },
      ],
    })
    const objectNode = new TreeNode({
      componentName: 'DesignableField',
      props: {
        type: 'object',
      },
      children: [indexNode, columnNode, operationNode],
    })
    const additionNode = new TreeNode({
      componentName: 'DesignableField',
      props: {
        type: 'void',
        title: 'Addition',
        'x-component': 'ArrayTable.Addition',
      },
    })
    return [objectNode, additionNode]
  })
  const columns = queryNodesByComponentPath(node, [
    'ArrayTable',
    '*',
    'ArrayTable.Column',
  ])
  const additions = queryNodesByComponentPath(node, [
    'ArrayTable',
    'ArrayTable.Addition',
  ])
  const defaultRowKey = () => {
    return node.id
  }

  const renderTable = () => {
    if (node.children.length === 0) return <Droppable />
    return (
      <ArrayBase disabled>
        <Table
          size="small"
          hasBorder
          {...props}
          className={cls('ant-formily-array-table', props.className)}
          style={{ marginBottom: 10, ...props.style }}
          primaryKey={defaultRowKey()}
          dataSource={[{ id: '1' }]}
        >
          {columns.map((node, key) => {
            const children = node.children.map((child) => {
              return <TreeNodeWidget node={child} key={child.id} />
            })
            return (
              <Table.Column
                {...node.props['x-component-props']}
                dataIndex={node.id}
                {...createNodeId(designer, node.id)}
                className={`data-id:${node.id}`}
                key={key}
                cell={(_, key: number) => {
                  return (
                    <ArrayBase.Item key={key} index={key}>
                      {children.length > 0 ? children : 'Droppable'}
                    </ArrayBase.Item>
                  )
                }}
              />
            )
          })}
          {columns.length === 0 && <Table.Column cell={() => <Droppable />} />}
        </Table>
        {additions.map((child) => {
          return <TreeNodeWidget node={child} key={child.id} />
        })}
      </ArrayBase>
    )
  }

  useDropTemplate('ArrayTable.Column', (source) => {
    return source.map((node) => {
      node.props.title = undefined
      return node
    })
  })

  return (
    <div {...nodeId} className="dn-array-table">
      {renderTable()}
      <LoadTemplate
        actions={[
          {
            title: 'Common.addIndex',
            onClick: () => {
              if (
                hasNodeByComponentPath(node, [
                  'ArrayTable',
                  '*',
                  'ArrayTable.Column',
                  'ArrayTable.Index',
                ])
              )
                return
              const tableColumn = new TreeNode({
                componentName: 'DesignableField',
                props: {
                  type: 'void',
                  'x-component': 'ArrayTable.Column',
                  'x-component-props': {
                    title: `Title`,
                  },
                },
                children: [
                  {
                    componentName: 'DesignableField',
                    props: {
                      type: 'void',
                      'x-component': 'ArrayTable.Index',
                    },
                  },
                ],
              })
              const sortNode = findNodeByComponentPath(node, [
                'ArrayTable',
                '*',
                'ArrayTable.Column',
                'ArrayTable.SortHandle',
              ])
              if (sortNode) {
                sortNode.parent.insertAfter(tableColumn)
              } else {
                ensureObjectItemsNode(node).prependNode(tableColumn)
              }
            },
          },
          {
            title: 'Common.addTableColumn',
            onClick: () => {
              const operationNode = findNodeByComponentPath(node, [
                'ArrayTable',
                '*',
                'ArrayTable.Column',
                (name) => {
                  return (
                    name === 'ArrayTable.Remove' ||
                    name === 'ArrayTable.MoveDown' ||
                    name === 'ArrayTable.MoveUp'
                  )
                },
              ])
              const tableColumn = new TreeNode({
                componentName: 'DesignableField',
                props: {
                  type: 'void',
                  'x-component': 'ArrayTable.Column',
                  'x-component-props': {
                    title: `Title`,
                  },
                },
              })
              if (operationNode) {
                operationNode.parent.insertBefore(tableColumn)
              } else {
                ensureObjectItemsNode(node).appendNode(tableColumn)
              }
            },
          },
          {
            title: 'Common.addOperation',
            onClick: () => {
              const oldOperationNode = findNodeByComponentPath(node, [
                'ArrayTable',
                '*',
                'ArrayTable.Column',
                (name) => {
                  return (
                    name === 'ArrayTable.Remove' ||
                    name === 'ArrayTable.MoveDown' ||
                    name === 'ArrayTable.MoveUp'
                  )
                },
              ])
              const oldAdditionNode = findNodeByComponentPath(node, [
                'ArrayTable',
                'ArrayTable.Addition',
              ])
              if (!oldOperationNode) {
                const operationNode = new TreeNode({
                  componentName: 'DesignableField',
                  props: {
                    type: 'void',
                    'x-component': 'ArrayTable.Column',
                    'x-component-props': {
                      title: `Title`,
                    },
                  },
                  children: [
                    {
                      componentName: 'DesignableField',
                      props: {
                        type: 'void',
                        'x-component': 'ArrayTable.Remove',
                      },
                    },
                    {
                      componentName: 'DesignableField',
                      props: {
                        type: 'void',
                        'x-component': 'ArrayTable.MoveDown',
                      },
                    },
                    {
                      componentName: 'DesignableField',
                      props: {
                        type: 'void',
                        'x-component': 'ArrayTable.MoveUp',
                      },
                    },
                  ],
                })
                ensureObjectItemsNode(node).appendNode(operationNode)
              }
              if (!oldAdditionNode) {
                const additionNode = new TreeNode({
                  componentName: 'DesignableField',
                  props: {
                    type: 'void',
                    title: 'Addition',
                    'x-component': 'ArrayTable.Addition',
                  },
                })
                ensureObjectItemsNode(node).insertAfter(additionNode)
              }
            },
          },
        ]}
      />
    </div>
  )
})

ArrayBase.mixin(DesignableArrayTable)
