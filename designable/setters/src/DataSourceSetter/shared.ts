import { uid, clone } from '@formily/shared'
import { IDataSourceItem, INodeItem } from './types'

export const tranverseTree = (
  data: { [name: string]: any }[],
  callback: (
    dataItem: { [name: string]: any },
    i: number,
    data: { [name: string]: any }[]
  ) => any
) => {
  for (let i = 0; i < data.length; i++) {
    callback(data[i], i, data)
    if (data[i]?.children) {
      tranverseTree(data[i]?.children, callback)
    }
  }
}

export const transformValueToData = (value: IDataSourceItem[]): INodeItem[] => {
  const data = clone(value)
  tranverseTree(data, (item, i, dataSource) => {
    const dataItem: INodeItem = {
      key: '',
      duplicateKey: '',
      map: [],
      children: [],
    }
    for (const [key, value] of Object.entries(dataSource[i] || {})) {
      if (key !== 'children') dataItem.map.push({ label: key, value: value })
    }
    const uuid = uid()
    dataItem.key = uuid
    dataItem.duplicateKey = uuid
    dataItem.children = dataSource[i].children || []
    dataSource[i] = dataItem
  })
  return data
}

export const transformDataToValue = (data: INodeItem[]): IDataSourceItem[] => {
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
