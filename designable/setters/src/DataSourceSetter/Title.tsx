import React from 'react'
import { clone } from '@formily/shared'
import { observer } from '@formily/reactive-react'
import { IconWidget, TextWidget } from '@designable/react'
import { INodeItem, ITreeDataSource } from './types'
import { tranverseTree } from './shared'
import './styles.less'
import { unstable_renderSubtreeIntoContainer } from 'react-dom'
export interface ITitleProps extends INodeItem {
  treeDataSource: ITreeDataSource
}

export const Title: React.FC<ITitleProps> = observer((props) => {
  const getTitleValue = (dataSource) => {
    const optionalKeys = ['label', 'title', 'header']
    let nodeTitle
    optionalKeys.some((key) => {
      const title = (dataSource || [])?.find(
        (item) => item.label === key
      )?.value
      if (title !== undefined) {
        nodeTitle = title
        return true
      }
      return false
    })
    if (nodeTitle === undefined) {
      ;(dataSource || [])?.some((item) => {
        if (item.value && typeof item.value === 'string') {
          nodeTitle = item.value
          return true
        }
        return false
      })
    }
    return nodeTitle
  }

  const renderTitle = (dataSource) => {
    const nodeTitle = getTitleValue(dataSource)
    if (nodeTitle === undefined)
      return (
        <TextWidget token="SettingComponents.DataSourceSetter.defaultTitle" />
      )
    else return nodeTitle + ''
  }

  return (
    <span>
      <span style={{ marginRight: '5px' }}>
        {renderTitle(props?.map || [])}
      </span>
      <IconWidget
        infer="Remove"
        onClick={() => {
          const newDataSource = clone(props?.treeDataSource?.dataSource)
          tranverseTree(newDataSource || [], (dataItem, i, data) => {
            if (data[i].key === props.duplicateKey) (data || []).splice(i, 1)
          })
          props.treeDataSource.dataSource = newDataSource
        }}
      />
    </span>
  )
})
