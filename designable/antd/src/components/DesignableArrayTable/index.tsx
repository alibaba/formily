import React from 'react'
import { Table, TableProps } from 'antd'
import { Droppable } from '../Droppable'
import { TreeNode } from '@designable/core'
import { useTreeNode, TreeNodeWidget, useNodeIdProps } from '@designable/react'
import { ArrayBase } from '@formily/antd'
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

const ensureObjectItemsNode = createEnsureTypeItemsNode('object')

export const DesignableArrayTable: React.FC<TableProps<any>> = observer(
  (props) => {
    const node = useTreeNode()
    const nodeId = useNodeIdProps()
    const designer = useDropTemplate('ArrayTable', (source) => {
      const sortHandleNode = new TreeNode({
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
              'x-component': 'ArrayTable.SortHandle',
            },
          },
        ],
      })
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
        children: [sortHandleNode, indexNode, columnNode, operationNode],
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
    const createColumnId = (props: any) => {
      return createNodeId(
        designer,
        props.className.match(/data-id\:([^\s]+)/)?.[1]
      )
    }

    useDropTemplate('ArrayTable.Column', (source) => {
      return source.map((node) => {
        node.props.title = undefined
        return node
      })
    })

    return (
      <div {...nodeId}>
        <ArrayBase disabled>
          <Table
            size="small"
            bordered
            {...props}
            scroll={{ x: '100%' }}
            className={cls('ant-formily-array-table', props.className)}
            style={{ marginBottom: 10, ...props.style }}
            rowKey={defaultRowKey}
            dataSource={[{ id: '1' }]}
            pagination={false}
            components={{
              header: {
                cell: (props: any) => {
                  return (
                    <th {...props} {...createColumnId(props)}>
                      {props.children}
                    </th>
                  )
                },
              },
              body: {
                cell: (props: any) => {
                  return (
                    <td {...props} {...createColumnId(props)}>
                      {props.children}
                    </td>
                  )
                },
              },
            }}
          >
            {columns.map((node, key) => {
              const children = node.children.map((child) => {
                return <TreeNodeWidget node={child} key={child.id} />
              })
              return (
                <Table.Column
                  {...node.props['x-component-props']}
                  dataIndex={node.id}
                  className={`data-id:${node.id}`}
                  key={key}
                  render={(value, record, key) => {
                    return (
                      <ArrayBase.Item key={key} index={key}>
                        {children.length > 0 ? children : 'Droppable'}
                      </ArrayBase.Item>
                    )
                  }}
                />
              )
            })}
            {columns.length === 0 && (
              <Table.Column render={() => <Droppable />} />
            )}
          </Table>
          {additions.map((child) => {
            return <TreeNodeWidget node={child} key={child.id} />
          })}
        </ArrayBase>
        <LoadTemplate
          actions={[
            {
              title: 'Common.addTableSortHandle',
              onClick: () => {
                if (
                  hasNodeByComponentPath(node, [
                    'ArrayTable',
                    '*',
                    'ArrayTable.Column',
                    'ArrayTable.SortHandle',
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
                        'x-component': 'ArrayTable.SortHandle',
                      },
                    },
                  ],
                })
                ensureObjectItemsNode(node).prepend(tableColumn)
              },
            },
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
                  ensureObjectItemsNode(node).prepend(tableColumn)
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
                  ensureObjectItemsNode(node).append(tableColumn)
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
                  ensureObjectItemsNode(node).append(operationNode)
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
  }
)

ArrayBase.mixin(DesignableArrayTable)
