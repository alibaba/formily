import React from 'react'
import { Tree, Icon } from 'antd'
import { ISchemaTreeProps } from '../utils/types'
import * as fp from 'lodash/fp'
import _ from 'lodash'

const TreeNode = Tree.TreeNode

export const SchemaTree: React.FC<ISchemaTreeProps> = ({
  schema,
  onChange,
  onSelect
}) => {
  const handleSelect = React.useCallback((path: string[]) => {
    onSelect(path[0])
  }, [])

  const handleDrop = React.useCallback(
    (info: any) => {
      const sourcePath = info.dragNode.props.eventKey
      const sourceKeys = sourcePath.split('.')
      const sourceKey = sourceKeys[sourceKeys.length - 1]
      const targetPath = info.node.props.eventKey
      const sourceValue = fp.get(sourcePath, schema)
      const targetValue =
        targetPath === 'root' ? schema : fp.get(targetPath, schema)

      if (!targetValue) {
        return
      }

      if (info.dropToGap) {
        // 拖拽到这个元素的同级
        // info.dropPosition -1 表示上方同级，1 表示下方同级
      } else {
        // 拖拽到这个元素内部
        if (targetValue.type === 'object') {
          // 拖入到 object
          if (
            (targetPath === 'root' && sourcePath.split('.').length === 2) ||
            (targetPath !== 'root' &&
              fp.dropRight(2, sourcePath.split('.')).join('.') === targetPath)
          ) {
            // 拖拽到直接父节点，等于不起作用
            return
          }

          let newSchema = schema

          // 增加新的 key
          const newTargetValue = fp.set(
            [
              'properties',
              getUniqueKeyFromObjectKeys(
                sourceKey,
                Object.keys(targetValue.properties || {})
              )
            ],
            sourceValue,
            targetValue
          )

          newSchema =
            targetPath === 'root'
              ? newTargetValue
              : fp.set(targetPath, newTargetValue, newSchema)

          // 删除旧的 key
          newSchema = fp.unset(sourcePath, newSchema)

          onChange(newSchema)
        } else if (
          targetValue.type === 'array' &&
          (fp.get(['items'], targetValue) || []).length === 0
        ) {
          // 拖入到 array

          // array 只能拖入一个元素，因此 A 的子节点 B 无法再次拖入 A
          let newSchema = schema

          // 增加新的 key
          const newTargetValue = fp.set(['items'], sourceValue, targetValue)

          newSchema = fp.set(targetPath, newTargetValue, newSchema)

          // 删除旧的 key
          newSchema = fp.unset(sourcePath, newSchema)

          onChange(newSchema)
        }
      }
    },
    [schema, onChange]
  )

  return (
      <Tree
        defaultExpandAll
        showIcon
        showLine
        draggable
        onSelect={handleSelect}
        onDrop={handleDrop}
      >
        {TreeNodeBySchema({ schema, path: [] })}
      </Tree>
  )
}

const TreeNodeBySchema: React.FC<{
  schema: any
  path: string[]
}> = ({ schema, path }) => {
  if (!schema) {
    return null
  }

  const currentTreeLevelProps = {
    title: path.length === 0 ? 'root' : path[path.length - 1],
    key: path.length === 0 ? 'root' : path.join('.')
  }

  switch (schema.type) {
    case 'object':
      return (
        <TreeNode icon={<Icon type="folder" />} {...currentTreeLevelProps}>
          {schema.properties &&
            Object.keys(schema.properties).map(key =>
              TreeNodeBySchema({
                schema: schema.properties[key],
                path: path.concat('properties', key)
              })
            )}
        </TreeNode>
      )
    case 'array':
      return (
        <TreeNode
          icon={<Icon type="deployment-unit" />}
          {...currentTreeLevelProps}
        >
          {schema.items &&
            TreeNodeBySchema({
              schema: schema.items,
              path: path.concat('items')
            })}
        </TreeNode>
      )
    default:
  }

  return <TreeNode icon={<Icon type="file" />} {...currentTreeLevelProps} />
}

function getUniqueKeyFromObjectKeys(key: string, keys: string[], count = -1) {
  if (count === -1) {
    if (keys.includes(key)) {
      return getUniqueKeyFromObjectKeys(key, keys, 0)
    }
    return key
  }

  const newKey = key + count
  if (keys.includes(newKey)) {
    return getUniqueKeyFromObjectKeys(key, keys, count + 1)
  } else {
    return newKey
  }
}