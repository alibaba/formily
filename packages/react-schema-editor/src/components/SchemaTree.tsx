import React from 'react'
import { Tree } from '@alifd/next'
import { ISchemaTreeProps } from '../utils/types'

const TreeNode = Tree.Node

export const SchemaTree: React.FC<ISchemaTreeProps> = ({
  schema,
  onChange
}) => {
  return (
    <div>
      <Tree defaultExpandAll showLine>
        <TreeNode label="Trunk">
          <TreeNode label="Branch">
            <TreeNode label="Branch">
              <TreeNode label="Leaf" />
            </TreeNode>
            <TreeNode label="Leaf" />
          </TreeNode>
          <TreeNode label="Branch">
            <TreeNode label="Leaf" />
            <TreeNode label="Leaf" />
          </TreeNode>
        </TreeNode>
      </Tree>
    </div>
  )
}
