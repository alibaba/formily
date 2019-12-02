import React, { useCallback } from 'react'
import { Tree, Row, Col } from 'antd'
import { ISchemaTreeProps } from '../utils/types'
import * as fp from 'lodash/fp'
import _ from 'lodash'
import FieldEditor from './FieldEditor'

const TreeNode = Tree.TreeNode

export const SchemaTree: React.FC<ISchemaTreeProps> = ({
  schema,
  onChange
}) => {
  const [selectedPath, setSelectedPath] = React.useState(null)

  const handleSelect = React.useCallback((path: string[]) => {
    setSelectedPath(path[0])
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
        if (targetValue.type !== 'object') {
          // 只有 object 才能被拖入
          return
        }

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
          ['properties', sourceKey],
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
      }
    },
    [schema, onChange]
  )

  const selectedSchema =
    selectedPath &&
    (selectedPath === 'root' ? schema : fp.get(selectedPath, schema))
  console.log('selectedPath====', selectedPath)
  console.log('selectedSchema====', selectedSchema)
  return (
    <Row>
      <Col span={12}>
        <Tree
          defaultExpandAll
          showLine
          draggable
          onSelect={handleSelect}
          onDrop={handleDrop}
        >
          {TreeNodeBySchema({ schema, path: [] })}
        </Tree>
      </Col>
      <Col span={12}>
        {selectedSchema && (
          <FieldEditor
            xProps={{
              help: {},
              validateStatus: {},
              hasFeedback: {}
            }}
            xRules={{ required: {}, pattern: {}, validator: {} }}
            components={[
              {
                name: 'Input',
                'x-component-props': {
                  value: {},
                  disabled: {},
                  onChange: {}
                }
              },
              {
                name: 'Switch',
                'x-component-props': {
                  checked: {},
                  disabled: {},
                  onChange: {}
                }
              }
            ]}
            schema={selectedSchema}
            onChange={value => {
              const newSchema = _.clone(schema)
              _.set(newSchema, selectedPath, value)
              onChange(newSchema)
            }}
          />
        )}
      </Col>
    </Row>
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
        <TreeNode {...currentTreeLevelProps}>
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
    default:
  }

  return <TreeNode {...currentTreeLevelProps} />
}
