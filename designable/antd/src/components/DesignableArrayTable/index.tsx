import React from 'react'
import { Table, TableProps } from 'antd'
import { Droppable } from '../Droppable'
import { TreeNode, AppendNodeEvent } from '@designable/core'
import {
  useTreeNode,
  useDesigner,
  TreeNodeWidget,
  useNodeIdProps,
} from '@designable/react'
import { ArrayBase } from '@formily/antd'
import { observer } from '@formily/react'
import { LoadTemplate } from '../LoadTemplate'
import cls from 'classnames'

const parseColumns = (nodes: TreeNode[]) => {
  return nodes.filter((node) => {
    return node.props['x-component'] === 'ArrayTable.Column'
  })
}

const parseAdditionComponents = (nodes: TreeNode[]) => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].props['x-component'] === 'ArrayTable.Addition')
      return <TreeNodeWidget node={nodes[i]} />
  }
}

export const DesignableArrayTable: React.FC<TableProps<any>> = observer(
  (props) => {
    const node = useTreeNode()
    const nodeId = useNodeIdProps()
    const designer = useDesigner((designer) => {
      return designer.subscribeTo(AppendNodeEvent, (event) => {
        const { source, target } = event.data
        if (Array.isArray(target)) return
        if (!Array.isArray(source)) return
        if (target.props['x-component'] === 'ArrayTable') {
          if (
            source.every(
              (node) => node.props['x-component'] !== 'ArrayTable.Column'
            )
          ) {
            const sortHandleNode = new TreeNode({
              componentName: 'DesignableField',
              props: {
                type: 'void',
                'x-component': 'ArrayTable.Column',
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
              },
            })
            const additionNode = new TreeNode({
              componentName: 'DesignableField',
              props: {
                type: 'void',
                title: 'Addition',
                'x-component': 'ArrayTable.Addition',
              },
            })
            const operationNode = new TreeNode({
              componentName: 'DesignableField',
              props: {
                type: 'void',
                'x-component': 'ArrayTable.Column',
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
            target.appendNode(
              sortHandleNode,
              indexNode,
              columnNode,
              additionNode,
              operationNode
            )
            columnNode.appendNode(...source)
          }
        }
      })
    })
    const columns = parseColumns(node.children)
    const addition = parseAdditionComponents(node.children)
    const defaultRowKey = () => {
      return node.id
    }
    const getColumnId = (props: any) => {
      return {
        [designer.props.nodeIdAttrName]:
          props.className.match(/data-id\:([^\s]+)/)?.[1],
      }
    }
    return (
      <div {...nodeId}>
        <ArrayBase disabled>
          <Table
            size="small"
            bordered
            {...props}
            className={cls('ant-formily-array-table', props.className)}
            style={{ marginBottom: 10, ...props.style }}
            rowKey={defaultRowKey}
            dataSource={[{ id: '1' }]}
            pagination={false}
            components={{
              header: {
                cell: (props: any) => {
                  return (
                    <th {...props} {...getColumnId(props)}>
                      {props.children}
                    </th>
                  )
                },
              },
              body: {
                cell: (props: any) => {
                  return (
                    <td {...props} {...getColumnId(props)}>
                      {props.children}
                    </td>
                  )
                },
              },
            }}
          >
            {columns.map((node, key) => {
              const children = node.children.map((child, key) => {
                return <TreeNodeWidget node={child} key={key} />
              })
              return (
                <Table.Column
                  title="Title"
                  {...node.props}
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
          {addition}
        </ArrayBase>
        <LoadTemplate
          actions={[
            {
              title: 'addTableSortHandle',
              onClick: () => {
                const tableColumn = new TreeNode({
                  componentName: 'DesignableField',
                  props: {
                    type: 'void',
                    'x-component': 'ArrayTable.Column',
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
                node.prependNode(tableColumn)
              },
            },
            {
              title: 'addTableIndex',
              onClick: () => {
                const tableColumn = new TreeNode({
                  componentName: 'DesignableField',
                  props: {
                    type: 'void',
                    'x-component': 'ArrayTable.Column',
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
                node.prependNode(tableColumn)
              },
            },
            {
              title: 'addTableColumn',
              onClick: () => {
                const tableColumn = new TreeNode({
                  componentName: 'DesignableField',
                  props: {
                    type: 'void',
                    'x-component': 'ArrayTable.Column',
                  },
                })
                node.appendNode(tableColumn)
              },
            },
            {
              title: 'addOperation',
              onClick: () => {
                const additionNode = new TreeNode({
                  componentName: 'DesignableField',
                  props: {
                    type: 'void',
                    title: 'Addition',
                    'x-component': 'ArrayTable.Addition',
                  },
                })
                const operationNode = new TreeNode({
                  componentName: 'DesignableField',
                  props: {
                    type: 'void',
                    'x-component': 'ArrayTable.Column',
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
                node.appendNode(additionNode, operationNode)
              },
            },
          ]}
        />
      </div>
    )
  }
)

ArrayBase.mixin(DesignableArrayTable)
