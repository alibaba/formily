import React from 'react'
import { Checkbox } from 'antd'

// 重写表格表头Checkbox
const newCheckbox =
  (
    selected,
    filteredFlatDataSource,
    primaryKey,
    disabled,
    readOnly,
    onChange
  ) =>
  () => {
    const currentDataSource = filteredFlatDataSource.filter(
      (item) => !item.disabled
    )
    const currentDataSourceKeys = currentDataSource.map(
      (item) => item?.[primaryKey]
    )
    const currentSelected = selected.filter((item) =>
      currentDataSourceKeys.includes(item)
    )
    const indeterminate = !!(
      currentSelected?.length &&
      currentSelected.length !== currentDataSource.length
    )
    return (
      <Checkbox
        key="titleAddons"
        checked={!!currentSelected?.length}
        disabled={disabled}
        indeterminate={indeterminate}
        onChange={(e) => {
          if (!readOnly) {
            if (e.target.checked || indeterminate) {
              onChange?.(currentDataSourceKeys, currentDataSource)
            } else {
              onChange?.([], [])
            }
          }
        }}
      />
    )
  }

const useTitleAddon = (
  selected: any[],
  filteredFlatDataSource: any[],
  primaryKey: string,
  mode: string,
  disabled: boolean,
  readOnly: boolean,
  onChange: (selectedRowKeys: any[], record: any[]) => any
) => {
  if (mode === 'single') {
    return {}
  }
  return {
    columnTitle: newCheckbox(
      selected,
      filteredFlatDataSource,
      primaryKey,
      disabled,
      readOnly,
      onChange
    ),
  }
}

export { useTitleAddon }
