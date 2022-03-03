import { getTreeKeys, hasSelectedKey, completedKeys } from './utils'

/**
 * 判断该字段的 indeterminate 属性
 * @param record 当前字段
 * @param selected 已选中的字段值集合
 * @param primaryKey 键名称
 * @returns indeterminate 属性值
 */
const getIndeterminate = (record: any, selected: any[], primaryKey: string) => {
  if (selected?.includes(record[primaryKey])) {
    return undefined
  }
  return hasSelectedKey(record.children, selected, primaryKey) || undefined
}

interface ICheckSlackly {
  (
    currentSelected: any[],
    allSelected: any[],
    primaryKey: string,
    flatDataSource: any[]
  ): {
    selectedRowKeys: any[]
    records: any[]
  }
}

const useCheckSlackly: ICheckSlackly = (
  currentSelected, // onChange 返回的 keys
  allSelected, // Table UI 展示的 keys
  primaryKey,
  flatDataSource
) => {
  const isSelected = currentSelected.length > allSelected.length // 判断是选中还是取消
  const currentKey = [...currentSelected, ...allSelected].find(
    (key) => !(currentSelected.includes(key) && allSelected.includes(key)) // 当前变化key不同时存在于两个selected
  )
  const currentRecords = flatDataSource.find(
    (item) => item[primaryKey] === currentKey
  )
  const currentTreeKeys = getTreeKeys([currentRecords], primaryKey)
  let newSelectedRowKeys = []
  if (isSelected) {
    // 选中当前key及其子keys
    newSelectedRowKeys = [...new Set([...allSelected, ...currentTreeKeys])]
  } else {
    // 移除当前key及其子keys
    newSelectedRowKeys = allSelected.filter(
      (key) => !currentTreeKeys.includes(key)
    )
  }

  newSelectedRowKeys = completedKeys(
    flatDataSource,
    newSelectedRowKeys,
    primaryKey
  )

  return {
    selectedRowKeys: newSelectedRowKeys,
    records: flatDataSource.filter((item) =>
      newSelectedRowKeys.includes(item[primaryKey])
    ),
  }
}

export { useCheckSlackly, getIndeterminate }
