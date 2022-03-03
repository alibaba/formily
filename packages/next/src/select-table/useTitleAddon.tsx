import React from 'react'
import { Checkbox } from '@alifd/next'

// 重写表格表头Checkbox
const newCheckbox =
  (selected, flatDataSource, primaryKey, disabled, readOnly, onChange) =>
  () => {
    const allDataSource = flatDataSource.filter((item) => !item.disabled)
    const allDataSourceKeys = allDataSource.map((item) => item?.[primaryKey])
    const indeterminate = !!(
      selected?.length && selected.length !== allDataSourceKeys.length
    )
    return (
      <Checkbox
        key="titleAddons"
        checked={!!selected?.length}
        disabled={disabled}
        indeterminate={indeterminate}
        onChange={(checked) => {
          if (!readOnly) {
            if (checked || indeterminate) {
              onChange?.(allDataSourceKeys, allDataSource)
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
  flatDataSource: any[],
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
    titleProps: () => ({
      style: { display: 'none' },
    }),
    titleAddons: newCheckbox(
      selected,
      flatDataSource,
      primaryKey,
      disabled,
      readOnly,
      onChange
    ),
  }
}

export { useTitleAddon }
