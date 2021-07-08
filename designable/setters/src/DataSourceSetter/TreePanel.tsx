import React, { Fragment } from 'react'
import { Tree, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { uid } from '@formily/shared'
import { observer } from '@formily/reactive-react'
import { usePrefix } from '@designable/react'
import { Title } from './Title'
import { Header } from './Header'
import { tranverseTree } from './utils'
import { ITreeDataSource, INodeItem } from './type'
import './styles.less'

export interface ITreePanelProps {
  treeDataSource: ITreeDataSource
}

export const TreePanel: React.FC<ITreePanelProps> = observer((props) => {
  const prefix = usePrefix('data-source-setter')
  const dropHanle = (info) => {
    const dropKey = info.node?.key
    const dragKey = info.dragNode?.key
    const dropPos = info.node.pos.split('-')
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
    const data = [...props.treeDataSource.dataSource]
    // Find dragObject
    let dragObj
    tranverseTree(data, (item, index, arr) => {
      if (arr[index].key === dragKey) {
        arr.splice(index, 1)
        dragObj = item
      }
    })

    if (!info.dropToGap) {
      // Drop on the content
      tranverseTree(
        data,

        (item) => {
          if (item.key === dropKey) {
            item.children = item.children || []
            // where to insert 示例添加到头部，可以是随意位置
            item.children.unshift(dragObj)
          }
        }
      )
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      tranverseTree(data, (item) => {
        if (item.key === dropKey) {
          item.children = item.children || []
          // where to insert 示例添加到头部，可以是随意位置
          item.children.unshift(dragObj)
          // in previous version, we use item.children.push(dragObj) to insert the
          // item to the tail of the children
        }
      })
    } else {
      let ar
      let i
      tranverseTree(data, (item, index, arr) => {
        if (item.key === dropKey) {
          ar = arr
          i = index
        }
      })
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj)
      } else {
        ar.splice(i + 1, 0, dragObj)
      }
    }
    props.treeDataSource.dataSource = data
  }
  return (
    <Fragment>
      <Header
        title="数据源节点树"
        extra={
          <Button
            type="text"
            onClick={() => {
              const uuid = uid()
              props.treeDataSource.dataSource =
                props.treeDataSource.dataSource.concat({
                  key: uuid,
                  duplicateKey: uuid,
                  map: [],
                  children: [],
                } as INodeItem)
            }}
            icon={<PlusOutlined />}
          >
            新增节点
          </Button>
        }
      />
      <div className={`${prefix + '-layout-item-content'}`}>
        <Tree
          defaultExpandAll
          draggable
          showLine={{ showLeafIcon: false }}
          treeData={props.treeDataSource.dataSource}
          onDragEnter={() => {}}
          onDrop={dropHanle}
          titleRender={(titleProps: INodeItem) => (
            <Title
              {...titleProps}
              treeDataSource={props.treeDataSource}
            ></Title>
          )}
          onSelect={(selectedKeys) => {
            if (selectedKeys[0]) {
              props.treeDataSource.selectedkey = selectedKeys[0].toString()
            }
          }}
        ></Tree>
      </div>
    </Fragment>
  )
})
