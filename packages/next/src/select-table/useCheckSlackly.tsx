import {
  getTreeKeys,
  hasSelectedKey,
  completedKeys,
  getCompatibleAllSelected,
} from './utils'

/**
 * 判断该字段的 indeterminate 属性
 * @param record 当前字段
 * @param flatDataSource 完整平铺数据
 * @param selected 已选中的字段值集合
 * @param primaryKey 键名称
 * @returns indeterminate 属性值
 */
const getIndeterminate = (
  record: any,
  flatDataSource: any,
  selected: any[],
  primaryKey: string
) => {
  if (selected?.includes(record[primaryKey])) {
    return undefined
  }
  const wholeRecord = flatDataSource.find(
    (item) => item[primaryKey] === record[primaryKey]
  )
  return hasSelectedKey(wholeRecord.children, selected, primaryKey) || undefined
}

interface ICheckSlackly {
  (
    currentSelected: any[],
    selected: any[],
    flatDataSource: any[],
    flatFilteredDataSource: any[],
    primaryKey: string,
    checkStrictly: boolean
  ): { selectedRowKeys: any[] }
}

// 父子节点（节点状态按全完整数据计算，节点操作按筛选数据计算）
const useCheckSlackly: ICheckSlackly = (
  currentSelected, // onChange 返回的 keys
  selected, // Table UI 展示的 keys
  flatDataSource,
  flatFilteredDataSource,
  primaryKey,
  checkStrictly
) => {
  let isSelected = currentSelected.length > selected.length // 判断是选中还是取消

  const currentKey = [...currentSelected, ...selected].find(
    (key) => !(currentSelected.includes(key) && selected.includes(key)) // 当前变化key不同时存在于两个selected
  )
  // 从过滤后的数据中获取当前record
  const currentRecord = flatFilteredDataSource.find(
    (item) => item[primaryKey] === currentKey
  )
  const currentTreeKeys = getTreeKeys(currentRecord.children, primaryKey)

  // 在筛选状态下（按钮的indeterminate状态处于异常）需要通过数据对比判断是否处于全选中状态
  if (
    getCompatibleAllSelected(
      selected,
      currentRecord.children,
      currentTreeKeys,
      checkStrictly,
      primaryKey
    )
  ) {
    isSelected = false
  }

  let newSelected = []
  if (isSelected) {
    // 选中当前key及其子keys
    newSelected = [...new Set([...selected, currentKey, ...currentTreeKeys])]
  } else {
    // 移除当前key及其子keys
    newSelected = selected.filter(
      (key) => ![currentKey, ...currentTreeKeys].includes(key)
    )
  }

  newSelected = completedKeys(flatDataSource, newSelected, primaryKey)

  return { selectedRowKeys: newSelected }
}

export { useCheckSlackly, getIndeterminate }
