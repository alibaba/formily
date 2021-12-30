import React from 'react'
import { Checkbox } from '@alifd/next'

// 重写表格表头Checkbox
const newCheckbox = (selected, dataSource, primaryKey, onChange) => () => {
  const getDataSourceKey = (data: any[], primaryKey: string) => {
    let keys = []
    data?.forEach((item: any) => {
      if (item?.[primaryKey]) {
        keys = [...keys, item[primaryKey]]
      }
      if (item?.children?.length) {
        keys = [...keys, ...getDataSourceKey(item.children, primaryKey)]
      }
    })
    return keys
  }
  const allDataSourceKeys = getDataSourceKey(dataSource, primaryKey)
  return (
    <Checkbox
      key="titleAddons"
      checked={!!selected?.length}
      indeterminate={
        !!(selected?.length && selected.length !== allDataSourceKeys.length)
      }
      onChange={(checked) => {
        if (checked) {
          onChange?.(allDataSourceKeys)
        } else {
          onChange?.([])
        }
      }}
    />
  )
}

const useTitleAddon = (
  selected: any[],
  dataSource: any[],
  primaryKey: string,
  mode: string,
  onChange: (checked: boolean) => any
) => {
  if (mode === 'single') {
    return {}
  }
  return {
    titleProps: () => ({
      style: { display: 'none' },
    }),
    titleAddons: newCheckbox(selected, dataSource, primaryKey, onChange),
  }
}

export { useTitleAddon }
