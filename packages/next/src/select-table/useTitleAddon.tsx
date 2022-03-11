import React from 'react'
import { Checkbox } from '@alifd/next'

// 重写表格表头Checkbox（节点状态按全完整数据计算，节点操作按筛选数据计算）
const newCheckbox =
  (
    selected,
    flatDataSource,
    filteredFlatDataSource,
    primaryKey,
    disabled,
    readOnly,
    onChange
  ) =>
  () => {
    // 当前可全选的keys
    const currentSelected = filteredFlatDataSource
      .filter((item) => !item.disabled)
      .map((item) => item?.[primaryKey])

    // 点击全选的完整数据（筛选前后）
    const newSelected = [...new Set([...selected, ...currentSelected])]
    const newRecords = flatDataSource.filter((item) =>
      newSelected.includes(item[primaryKey])
    )

    // 取消全选的剩余数据（筛选前后）
    const restSelected = selected.filter(
      (key) => !currentSelected.includes(key)
    )
    const restRecords = flatDataSource.filter((item) =>
      restSelected.includes(item[primaryKey])
    )

    // 全选框是否选中
    const checked = Boolean(
      selected?.length &&
        selected?.length ===
          flatDataSource.filter((item) => !item.disabled).length
    )
    // 全选框是否未完全选中
    const indeterminate = Boolean(selected?.length && !checked)

    return (
      <Checkbox
        key="titleAddons"
        disabled={disabled}
        checked={checked}
        indeterminate={indeterminate}
        onChange={(checked) => {
          if (!readOnly) {
            if (checked) {
              onChange?.(newSelected, newRecords)
            } else {
              onChange?.(restSelected, restRecords)
            }
          }
        }}
      />
    )
  }

const useTitleAddon = (
  selected: any[],
  flatDataSource: any[],
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
    titleProps: () => ({
      style: { display: 'none' },
    }),
    titleAddons: newCheckbox(
      selected,
      flatDataSource,
      filteredFlatDataSource,
      primaryKey,
      disabled,
      readOnly,
      onChange
    ),
  }
}

export { useTitleAddon }
