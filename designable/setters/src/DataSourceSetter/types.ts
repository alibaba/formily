export interface IDataSourceItem {
  label?: ''
  value?: any
  children?: any[]
}

export interface INodeItem {
  key: string
  duplicateKey?: string
  map: { label: string; value: any }[]
  children: []
}

export interface ITreeDataSource {
  dataSource: INodeItem[]
  selectedkey: string
}
