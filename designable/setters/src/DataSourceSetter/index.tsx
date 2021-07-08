import React, { Fragment, useMemo, useState } from 'react'
import cls from 'classnames'
import { Modal, Button } from 'antd'
import { uid, clone } from '@formily/shared'
import { observable } from '@formily/reactive'
import { observer } from '@formily/reactive-react'
import { usePrefix, useTheme } from '@designable/react'
import { DataSettingPanel } from './DataSettingPanel'
import { TreePanel } from './TreePanel'
import { tranverseTree } from './utils'
import { IDataSourceItem, INodeItem, ITreeDataSource } from './type'
import './styles.less'

export interface IBorderStyleSetterProps {
  className?: string
  style?: React.CSSProperties
  onChange: (v) => void
  value: IDataSourceItem[]
}
export const DataSourceSetter: React.FC<IBorderStyleSetterProps> = observer(
  (props) => {
    const { className, value = [], onChange } = props
    const theme = useTheme()
    const prefix = usePrefix('data-source-setter')
    const [modalVisible, setModalVisible] = useState(false)
    const transformValueToData = (value: IDataSourceItem[]): INodeItem[] => {
      const data = clone(value)
      tranverseTree(data, (item, i, dataSource) => {
        const dataItem: INodeItem = {
          key: '',
          duplicateKey: '',
          map: [],
          children: [],
        }
        for (const [key, value] of Object.entries(dataSource[i] || {})) {
          if (key !== 'children')
            dataItem.map.push({ label: key, value: value })
        }
        const uuid = uid()
        dataItem.key = uuid
        dataItem.duplicateKey = uuid
        dataItem.children = dataSource[i].children || []
        dataSource[i] = dataItem
      })
      return data
    }
    const transformDataToValue = (data: INodeItem[]): IDataSourceItem[] => {
      const value = clone(data)
      tranverseTree(value, (item, i, dataSource) => {
        let valueItem: IDataSourceItem = {
          children: [],
        }
        ;(dataSource[i].map || []).forEach((item) => {
          if (item.label) valueItem[item.label] = item.value
        })
        valueItem.children = dataSource[i]?.children || []
        dataSource[i] = valueItem
      })
      return value
    }
    const treeDataSource: ITreeDataSource = useMemo(
      () =>
        observable({
          dataSource: transformValueToData(value),
          selectedkey: '',
        }),
      [value]
    )
    const openModal = () => setModalVisible(true)
    const closeModal = () => setModalVisible(false)

    return (
      <Fragment>
        <Button onClick={openModal}>配置数据源</Button>
        <Modal
          width={'50%'}
          title={'数据源'}
          visible={modalVisible}
          onCancel={closeModal}
          onOk={() => {
            onChange(transformDataToValue(treeDataSource.dataSource))
            closeModal()
          }}
        >
          <div
            className={`${cls(prefix, className)} ${prefix + '-' + theme} ${
              prefix + '-layout'
            }`}
          >
            <div className={`${prefix + '-layout-item'}`}>
              <TreePanel treeDataSource={treeDataSource}></TreePanel>
            </div>
            <div className={`${prefix + '-layout-item'}`}>
              <DataSettingPanel
                treeDataSource={treeDataSource}
              ></DataSettingPanel>
            </div>
          </div>
        </Modal>
      </Fragment>
    )
  }
)
