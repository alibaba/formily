import React, { Fragment } from 'react'
import { Card, CardProps } from 'antd'
import { Droppable } from '../Droppable'
import { TreeNode } from '@designable/core'
import { useTreeNode, TreeNodeWidget, useNodeIdProps } from '@designable/react'
import { ArrayBase } from '@formily/antd'
import { observer } from '@formily/react'
import { LoadTemplate } from '../LoadTemplate'
import cls from 'classnames'
import { useDropTemplate } from '../../hooks'
import {
  hasNodeByComponentPath,
  queryNodesByComponentPath,
  createEnsureTypeItemsNode,
  findNodeByComponentPath,
  createNodeId,
} from '../../shared'
import './styles.less'

const ensureVoidItemsNode = createEnsureTypeItemsNode('void')

const isArrayCardsOperation = (name: string) =>
  name === 'ArrayCards.Remove' ||
  name === 'ArrayCards.MoveDown' ||
  name === 'ArrayCards.MoveUp'

export const DesignableArrayCards: React.FC<CardProps> = observer((props) => {
  const node = useTreeNode()
  const nodeId = useNodeIdProps()
  const designer = useDropTemplate('ArrayCards', (source) => {
    const indexNode = new TreeNode({
      componentName: 'DesignableField',
      props: {
        type: 'void',
        'x-component': 'ArrayCards.Index',
      },
    })
    const additionNode = new TreeNode({
      componentName: 'DesignableField',
      props: {
        type: 'void',
        title: 'Addition',
        'x-component': 'ArrayCards.Addition',
      },
    })
    const removeNode = new TreeNode({
      componentName: 'DesignableField',
      props: {
        type: 'void',
        title: 'Addition',
        'x-component': 'ArrayCards.Remove',
      },
    })
    const moveDownNode = new TreeNode({
      componentName: 'DesignableField',
      props: {
        type: 'void',
        title: 'Addition',
        'x-component': 'ArrayCards.MoveDown',
      },
    })
    const moveUpNode = new TreeNode({
      componentName: 'DesignableField',
      props: {
        type: 'void',
        title: 'Addition',
        'x-component': 'ArrayCards.MoveUp',
      },
    })

    const voidNode = new TreeNode({
      componentName: 'DesignableField',
      props: {
        type: 'void',
      },
      children: [indexNode, ...source, removeNode, moveDownNode, moveUpNode],
    })
    return [voidNode, additionNode]
  })
  const renderCard = () => {
    if (node.children.length === 0) return <Droppable />
    const additions = queryNodesByComponentPath(node, [
      'ArrayCards',
      'ArrayCards.Addition',
    ])
    const indexes = queryNodesByComponentPath(node, [
      'ArrayCards',
      '*',
      'ArrayCards.Index',
    ])
    const operations = queryNodesByComponentPath(node, [
      'ArrayCards',
      '*',
      isArrayCardsOperation,
    ])
    const children = queryNodesByComponentPath(node, [
      'ArrayCards',
      '*',
      (name) => name.indexOf('ArrayCards.') === -1,
    ])
    return (
      <ArrayBase disabled>
        <ArrayBase.Item index={0}>
          <Card
            {...props}
            title={
              <span>
                {indexes.map((node, key) => (
                  <TreeNodeWidget key={key} node={node} />
                ))}
                {props.title}
              </span>
            }
            className={cls('ant-formily-array-cards-item', props.className)}
            extra={
              <Fragment>
                {operations.map((node) => (
                  <TreeNodeWidget key={node.id} node={node} />
                ))}
                {props.extra}
              </Fragment>
            }
          >
            <div {...createNodeId(designer, ensureVoidItemsNode(node).id)}>
              {children.length ? (
                children.map((node) => (
                  <TreeNodeWidget key={node.id} node={node} />
                ))
              ) : (
                <Droppable />
              )}
            </div>
          </Card>
        </ArrayBase.Item>
        {additions.map((node) => (
          <TreeNodeWidget key={node.id} node={node} />
        ))}
      </ArrayBase>
    )
  }

  return (
    <div {...nodeId} className="dn-array-cards">
      {renderCard()}
      <LoadTemplate
        actions={[
          {
            title: 'Common.addIndex',
            onClick: () => {
              if (
                hasNodeByComponentPath(node, [
                  'ArrayCards',
                  '*',
                  'ArrayCards.Index',
                ])
              )
                return
              const indexNode = new TreeNode({
                componentName: 'DesignableField',
                props: {
                  type: 'void',
                  'x-component': 'ArrayCards.Index',
                },
              })
              ensureVoidItemsNode(node).append(indexNode)
            },
          },

          {
            title: 'Common.addOperation',
            onClick: () => {
              const oldAdditionNode = findNodeByComponentPath(node, [
                'ArrayCards',
                'ArrayCards.Addition',
              ])
              if (!oldAdditionNode) {
                const additionNode = new TreeNode({
                  componentName: 'DesignableField',
                  props: {
                    type: 'void',
                    title: 'Addition',
                    'x-component': 'ArrayCards.Addition',
                  },
                })
                ensureVoidItemsNode(node).insertAfter(additionNode)
              }
              const oldRemoveNode = findNodeByComponentPath(node, [
                'ArrayCards',
                '*',
                'ArrayCards.Remove',
              ])
              const oldMoveDownNode = findNodeByComponentPath(node, [
                'ArrayCards',
                '*',
                'ArrayCards.MoveDown',
              ])
              const oldMoveUpNode = findNodeByComponentPath(node, [
                'ArrayCards',
                '*',
                'ArrayCards.MoveUp',
              ])
              if (!oldRemoveNode) {
                ensureVoidItemsNode(node).append(
                  new TreeNode({
                    componentName: 'DesignableField',
                    props: {
                      type: 'void',
                      'x-component': 'ArrayCards.Remove',
                    },
                  })
                )
              }
              if (!oldMoveDownNode) {
                ensureVoidItemsNode(node).append(
                  new TreeNode({
                    componentName: 'DesignableField',
                    props: {
                      type: 'void',
                      'x-component': 'ArrayCards.MoveDown',
                    },
                  })
                )
              }
              if (!oldMoveUpNode) {
                ensureVoidItemsNode(node).append(
                  new TreeNode({
                    componentName: 'DesignableField',
                    props: {
                      type: 'void',
                      'x-component': 'ArrayCards.MoveUp',
                    },
                  })
                )
              }
            },
          },
        ]}
      />
    </div>
  )
})

ArrayBase.mixin(DesignableArrayCards)
