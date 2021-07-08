import React from 'react'
import { clone } from '@formily/shared'
import { observer } from '@formily/reactive-react'
import { GlobalRegistry } from '@designable/core'
import { IconWidget } from '@designable/react'
import { INodeItem, ITreeDataSource } from './types'
import { tranverseTree } from './shared'
import './styles.less'
export interface ITitleProps extends INodeItem {
  treeDataSource: ITreeDataSource
}

export const Title: React.FC<ITitleProps> = observer((props) => {
  return (
    <span>
      <span style={{ marginRight: '5px' }}>
        {((props?.map || [])?.find((item) => item.label === 'label')?.value ||
          GlobalRegistry.getDesignerMessage('components.defaultTitle')) + ''}
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
