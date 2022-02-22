import { isArr } from '@formily/shared'

/**
 * 获取该字段Checkbox的indeterminate属性
 * @param record 字段项
 * @param primaryKey 键名称
 * @param selected 当前选中的字段值集合
 * @returns indeterminate属性值
 */
const getCheckedProps = (record: any, primaryKey: string, selected: any[]) => {
  if (record.children?.length) {
    const childrenDataSource = record.children
    const selectedChildren = childrenDataSource.filter((item) =>
      selected?.includes(item[primaryKey])
    )
    return {
      // checked受控，此处配置在rowSelection并不会生效，供getFinalTreeKeys使用
      checked: selectedChildren.length === childrenDataSource.length,
      indeterminate: !!(
        selectedChildren.length &&
        selectedChildren.length !== childrenDataSource.length
      ),
    }
  }
  return {}
}

/**
 * 获取树列表某个键值的集合
 * @param tree 树列表
 * @param primaryKey 键名称
 * @returns 键值数组集合
 */
const getTreeKeys = (tree: any[], primaryKey: string) =>
  isArr(tree)
    ? tree.reduce(
        (prev, current) => [
          ...prev,
          current[primaryKey],
          ...getTreeKeys(current?.children, primaryKey),
        ],
        []
      )
    : []

/**
 * 获取最终选中值（添加选中所有子元素的父元素，或移除未选中所有子元素的父元素）
 * @param tree 树列表
 * @param primaryKey 键名称
 * @param selectedRowKeys 当前选中的字段值集合
 * @returns 最终选中的字段值集合
 */
const getFinalTreeKeys = (
  tree: any[] = [],
  primaryKey: string,
  selectedRowKeys: any[]
) => {
  let finalSelectedRowKeys = [...selectedRowKeys]

  tree.forEach((item) => {
    if (item.children?.length) {
      // 优先递归子元素
      finalSelectedRowKeys = getFinalTreeKeys(
        item.children,
        primaryKey,
        finalSelectedRowKeys
      )
      if (getCheckedProps(item, primaryKey, finalSelectedRowKeys)?.checked) {
        // 如果该元素的子元素全部选中，则也选中该项（即包含全选子元素的父元素）
        finalSelectedRowKeys = [
          ...new Set([...finalSelectedRowKeys, item[primaryKey]]),
        ]
      } else {
        // 如果该元素的子元素未全部选中，则移除该项
        finalSelectedRowKeys = finalSelectedRowKeys.filter(
          (key) => key !== item[primaryKey]
        )
      }
    }
  })

  return finalSelectedRowKeys
}

interface ICheckSlackly {
  (
    selectedRowKeys: any[],
    selected: any[],
    primaryKey: string,
    flatDataSource: any[]
  ): {
    selectedRowKeys: any[]
    records: any[]
  }
}

const useCheckSlackly: ICheckSlackly = (
  selectedRowKeys,
  selected,
  primaryKey,
  flatDataSource
) => {
  const isSelected = selectedRowKeys.length > selected.length
  const currentKey = [...selectedRowKeys, ...selected].find(
    (key) => !(selectedRowKeys.includes(key) && selected.includes(key))
  )
  const currentRecords = flatDataSource.find(
    (item) => item[primaryKey] === currentKey
  )
  const currentTreeKeys = getTreeKeys([currentRecords], primaryKey)
  let newSelectedRowKeys = []

  if (isSelected) {
    newSelectedRowKeys = [...new Set([...selected, ...currentTreeKeys])]
  } else {
    newSelectedRowKeys = selected.filter(
      (key) => !currentTreeKeys.includes(key)
    )
  }
  // 添加选中所有子元素的父元素，或移除未选中所有子元素的父元素
  newSelectedRowKeys = getFinalTreeKeys(
    flatDataSource,
    primaryKey,
    newSelectedRowKeys
  )

  return {
    selectedRowKeys: newSelectedRowKeys,
    records: flatDataSource.filter((item) =>
      newSelectedRowKeys.includes(item[primaryKey])
    ),
  }
}

export { useCheckSlackly, getCheckedProps }
