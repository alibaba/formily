import React from 'react'

import {
  DeleteOutlined,
  DeploymentUnitOutlined,
  FileOutlined,
  FolderOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import { Tree, Menu, Dropdown } from 'antd';
import { ISchemaTreeProps } from '../utils/types'
import { getFieldTypeData } from '../utils/fieldEditorHelpers';
import * as fp from 'lodash/fp'

const TreeNode = Tree.TreeNode
const { SubMenu } = Menu;

export const SchemaTree: React.FC<ISchemaTreeProps> = ({
  schema,
  onChange,
  onSelect
}) => {
  const addIndex = React.useRef(0)
  const selectedKey = React.useRef('');

  const handleSelect = React.useCallback((path: string[]) => {
    selectedKey.current = path[0];
    onSelect && onSelect(path[0])
  }, [])

  const handleRightClick = ({node}) => {
    handleSelect([node.props.eventKey]);
  }

  const handleMenuClick = ({ item, key, keyPath, domEvent }) => {
    if(selectedKey.current === 'root') return; // 根节点不能进行任何操作
    if(keyPath.length > 1) {
      if(keyPath[1] == 'node') {// 添加节点
        addNode(keyPath[0]);
      } else if (keyPath[1] == 'child') { // 添加叶子节点
        addChildNode(keyPath[0])
      } else {
  
      }
    } else {
      switch(keyPath[0]) {
        case 'delete':
          deleteNode()
          break;
      }
    }
    
  }

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

  const addNode = React.useCallback((type) => {
    let newSchema = schema
    let pathArr = selectedKey.current.split('.');
    pathArr.pop();
    pathArr.push('new' + addIndex.current++);
    newSchema = fp.set(
      pathArr.join('.'),
      { type: type || 'object' },
      newSchema
    )

    onChange(newSchema)
  }, [schema, onChange])

  const addChildNode = React.useCallback((type) => {
    let newSchema = schema
    newSchema = fp.set(
      `${selectedKey.current}.properties.new${addIndex.current++}`,
      { type: type || 'object' },
      newSchema
    )

    onChange(newSchema)
  }, [schema, onChange])

  const deleteNode = React.useCallback(() => {
    let newSchema = schema
    newSchema = fp.unset(selectedKey.current, newSchema);
    onChange(newSchema)
  }, [schema, onChange])

  const getSubMenus = () => {
    const {options} = getFieldTypeData();
    return options.map(option => {
      return <Menu.Item key={option.value}>{option.label}</Menu.Item>
    })
  }

  const getMenu = () => {
    const fieldSchema = fp.get(selectedKey.current, schema);
    const disableChildNode = !fieldSchema || fieldSchema.type === 'string'
    return (
      <Menu onClick={handleMenuClick}>
        <SubMenu key='node' title={<><PlusOutlined></PlusOutlined>添加节点 </>}>
          {getSubMenus()}
        </SubMenu>
        <SubMenu key='child' title={<><PlusOutlined></PlusOutlined>添加子节点 </>} disabled={disableChildNode}>
          {getSubMenus()}
        </SubMenu>
        <Menu.Item key='delete'>
          <DeleteOutlined></DeleteOutlined>删除节点
        </Menu.Item>
      </Menu>
    );
  }

  return (
    <Dropdown overlay={getMenu()} trigger={['contextMenu']}>
      <div>
        <Tree
          defaultExpandAll
          showLine
          draggable
          selectedKeys={[selectedKey.current]}
          onSelect={handleSelect}
          onDrop={handleDrop}
          onRightClick={handleRightClick}
        >
          {TreeNodeBySchema({ schema, path: [] })}
        </Tree>
      </div>
    </Dropdown>
    
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
        <TreeNode active icon={<FolderOutlined />} {...currentTreeLevelProps}>
          {schema.properties &&
            Object.keys(schema.properties).map(key =>
              TreeNodeBySchema({
                schema: schema.properties[key],
                path: path.concat('properties', key)
              })
            )}
        </TreeNode>
      );
    case 'array':
      return (
        <TreeNode
          active
          icon={<DeploymentUnitOutlined />}
          {...currentTreeLevelProps}
        >
          {schema.items &&
            TreeNodeBySchema({
              schema: schema.items,
              path: path.concat('items')
            })}
        </TreeNode>
      );
    default:
  }

  return <TreeNode active icon={<FileOutlined />} {...currentTreeLevelProps} />;
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
