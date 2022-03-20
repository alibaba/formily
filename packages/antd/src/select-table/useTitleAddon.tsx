import React from 'react'
import { Checkbox } from 'antd'
import { completedKeys, getCompatibleAllSelected } from './utils'

// 重写表格表头Checkbox（节点状态按全完整数据计算，节点操作按筛选数据计算）
const newCheckbox =
  (
    selected,
    flatDataSource,
    flatFilteredDataSource,
    primaryKey,
    disabled,
    readOnly,
    checkStrictly,
    onChange
  ) =>
  () => {
    // 全选框是否选中
    const checked = Boolean(
      selected?.length &&
        selected?.length ===
          flatDataSource.filter((item) => !item.disabled).length
    )
    // 全选框是否未完全选中
    const indeterminate = Boolean(selected?.length && !checked)

    const onInnerChange = (e) => {
      if (!readOnly) {
        let isSelected = e.target.checked
        // 当前可执行全选的keys
        const usableKeys = flatFilteredDataSource
          .filter((item) => !item.disabled)
          .map((item) => item?.[primaryKey])
        // 在筛选状态下（按钮的indeterminate状态处于异常）需要通过数据对比判断是否处于全选中状态
        if (
          getCompatibleAllSelected(
            selected,
            flatFilteredDataSource,
            usableKeys,
            checkStrictly,
            primaryKey
          )
        ) {
          isSelected = false
        }

        let newSelected = []
        if (isSelected) {
          // 执行全选
          newSelected = [...new Set([...selected, ...usableKeys])]
        } else {
          // 执行取消全选
          newSelected = selected.filter((key) => !usableKeys.includes(key))
        }
        newSelected = completedKeys(flatDataSource, newSelected, primaryKey)
        onChange?.(newSelected)
      }
    }

    return (
      <Checkbox
        key="titleAddons"
        disabled={disabled}
        checked={checked}
        indeterminate={indeterminate}
        onChange={onInnerChange}
      />
    )
  }

const useTitleAddon = (
  selected: any[],
  flatDataSource: any[],
  flatFilteredDataSource: any[],
  primaryKey: string,
  mode: string,
  disabled: boolean,
  readOnly: boolean,
  checkStrictly: boolean,
  onChange: (selectedRowKeys: any[], record: any[]) => any
) => {
  if (mode === 'single') {
    return {}
  }
  return {
    columnTitle: newCheckbox(
      selected,
      flatDataSource,
      flatFilteredDataSource,
      primaryKey,
      disabled,
      readOnly,
      checkStrictly,
      onChange
    ),
  }
}

export { useTitleAddon }
