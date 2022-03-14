import { isArr, isFn } from '@formily/shared'
import { useFlatOptions } from './useFlatOptions'

/**
 * 获取树列表某个键值的集合
 * @param tree 树列表
 * @param primaryKey 键名称
 * @returns 键值数组集合
 */
const getTreeKeys = (tree: any[], primaryKey: string) =>
  isArr(tree)
    ? tree.reduce((prev, current) => {
        if (current?.disabled) {
          return prev
        }
        return [
          ...prev,
          current[primaryKey],
          ...getTreeKeys(current?.children, primaryKey),
        ]
      }, [])
    : []

/**
 * 判断树列表中是否有任一 key 被选中
 * @param tree 树列表
 * @param selected 已选中的 keys
 * @param primaryKey 键名
 * @returns
 */
const hasSelectedKey = (tree: any[], selected: any[], primaryKey: string) => {
  const keys = getTreeKeys(tree, primaryKey)
  const mergedKeys = [...keys, ...selected]
  const validKeys = [...new Set(mergedKeys)]
  return validKeys.length !== mergedKeys.length
}

/**
 * 判断列表项是否全部被选中
 * @param list 一阶列表
 * @param selected 当前选中的字段值集合
 * @param primaryKey 键名称
 * @returns 是否全部被选中
 */
const isAllSelected = (list: any[], selected: any[], primaryKey: string) => {
  const validList = list.filter((item) => !item?.disabled)
  const selectedList = validList.filter((item) =>
    selected?.includes(item[primaryKey])
  )
  return selectedList.length === validList.length
}

/**
 * 完善TableUI Keys（添加选中所有子元素的父元素，或移除未选中所有子元素的父元素）
 * @param flatDataSource 完整数据平铺列表
 * @param selected 当前选中的字段值集合
 * @param primaryKey 键名称
 * @returns 完整的字段值集合
 */
const completedKeys = (
  flatDataSource: any[] = [],
  selected: any[],
  primaryKey: string
) => {
  let allSelectedKeys = [...selected]
  flatDataSource.forEach((item) => {
    if (item.children?.length) {
      // 优先递归子元素
      allSelectedKeys = completedKeys(
        item.children,
        allSelectedKeys,
        primaryKey
      )
      if (isAllSelected(item.children, allSelectedKeys, primaryKey)) {
        // 如果该元素的子元素全部选中，且该元素未禁用，则也选中该项（即包含全选子元素的父元素）
        if (!item?.disabled) {
          allSelectedKeys = [...new Set([...allSelectedKeys, item[primaryKey]])]
        }
      } else {
        // 如果该元素的子元素未全部选中，则移除该项
        allSelectedKeys = allSelectedKeys.filter(
          (key) => key !== item[primaryKey]
        )
      }
    }
  })
  return allSelectedKeys
}

/**
 * 获取数列表中被选中的有效路径
 * @param tree 数列表
 * @param selected 当前选中的字段值集合
 * @param primaryKey 键名称
 * @returns 有效的树路径
 */
const getSelectedPath = (tree = [], selected, primaryKey) => {
  const pathData = []

  tree.forEach((item) => {
    const validChildren = getSelectedPath(item.children, selected, primaryKey)
    if (validChildren.length || selected?.includes(item[primaryKey])) {
      pathData.push({
        ...item,
        ...(validChildren.length ? { children: validChildren } : {}),
      })
    }
  })

  return pathData
}

/**
 * 删除树列表的某个 key/value 键值对
 * @param tree
 * @param key
 * @returns
 */
const deleteTreeItem = (tree: any[], key: string) =>
  tree.map((item) => {
    const validItem = { ...item }
    delete validItem[key]
    if (validItem.children?.length) {
      validItem.children = deleteTreeItem(validItem.children, key)
    }
    return validItem
  })

/**
 * 根据 valueType 获取最终输出值
 * @param keys 当前选中的 key 集合（all完整类型）
 * @param records 当前选中的 option 集合
 * @param dataSource 数据源集合
 * @param primaryKey 键名
 * @param originalValueType 值输出类型
 * @param originalOptionAsValue
 * @param mode
 * @param checkStrictly
 * @returns 最终输出的 keys 和 options
 */
const getOutputData = (
  keys, // selected
  options,
  dataSource,
  primaryKey,
  originalValueType,
  originalOptionAsValue,
  mode,
  checkStrictly
) => {
  const valueType = checkStrictly !== false ? 'all' : originalValueType // valueType 在 Strictly 为 false 时生效
  const optionAsValue = valueType === 'path' ? false : originalOptionAsValue // optionAsValue 在 path 模式不生效
  let outputValue = []
  let outputOptions = []

  if (valueType === 'parent') {
    // 移除所有选中值的子值
    let childrenKeys = []
    options.forEach((option) => {
      childrenKeys = [
        ...childrenKeys,
        ...getTreeKeys(option.children, primaryKey),
      ]
    })
    outputValue = keys.filter((key) => !childrenKeys.includes(key))
    outputOptions = options.filter((options) =>
      outputValue.includes(options[primaryKey])
    )
  } else if (valueType === 'child') {
    outputValue = [...keys]
    outputOptions = [...options]
    outputOptions.forEach((option) => {
      // 移除当前有子值被选中的父值
      if (hasSelectedKey(option.children, keys, primaryKey)) {
        outputValue = outputValue.filter((key) => key !== option[primaryKey])
        outputOptions = outputOptions.filter(
          (options) => options[primaryKey] !== option[primaryKey]
        )
      }
    })
  } else if (valueType === 'path') {
    outputValue = getSelectedPath(dataSource, keys, primaryKey)
    outputOptions = [...options]
  } else {
    // valueType === 'all'
    outputValue = [...keys]
    outputOptions = [...options]
  }

  outputOptions = deleteTreeItem(outputOptions, '__formily_key__')
  outputValue =
    optionAsValue && valueType !== 'path' ? outputOptions : outputValue
  if (mode === 'single') {
    outputValue = outputValue[0]
    outputOptions = outputOptions[0]
  }

  return { outputValue, outputOptions }
}

/**
 * 根据 valueType 获取 TableUI 显示值
 * @param keys 回填的数据（输出的）keys 集合
 * @param flatDataSource 平铺的数据源集合
 * @param primaryKey 键名称
 * @param originalValueType 值输出类型
 * @param originalOptionAsValue
 * @param mode
 * @param checkStrictly
 * @param rowKey
 * @returns [] TableUI keys 集合
 */
const getUISelected = (
  value,
  flatDataSource,
  primaryKey,
  originalValueType,
  originalOptionAsValue,
  mode,
  checkStrictly,
  rowKey
) => {
  const valueType = checkStrictly !== false ? 'all' : originalValueType // valueType 在 Strictly 为 false 时生效
  const optionAsValue = valueType === 'path' ? false : originalOptionAsValue // optionAsValue 在 path 模式不生效

  let keys = mode === 'single' ? [value] : isArr(value) ? value : []
  keys =
    optionAsValue && valueType !== 'path'
      ? keys.map((record: any) =>
          isFn(rowKey) ? rowKey(record) : record?.[primaryKey]
        )
      : keys

  let newKeys = []
  if (valueType === 'parent') {
    const options = flatDataSource.filter((item) =>
      keys.includes(item[primaryKey])
    )
    let childrenKeys = []
    options.forEach((option) => {
      childrenKeys = [
        ...childrenKeys,
        ...getTreeKeys(option.children, primaryKey),
      ]
    })
    newKeys = [...new Set([...keys, ...childrenKeys])]
  } else if (valueType === 'child') {
    newKeys = completedKeys(flatDataSource, keys, primaryKey)
  } else if (valueType === 'path') {
    const pathKeys = useFlatOptions(keys).map((item) => item[primaryKey])
    newKeys = completedKeys(flatDataSource, pathKeys, primaryKey)
  } else {
    // valueType === 'all'
    newKeys = [...keys]
  }

  return newKeys
}

/**
 * 获取兼容筛选模式下是否全部选中子元素
 * @param selected 已选中项
 * @param dataSource 当前数据结构
 * @param usableKeys 当前数据结构的可执行项
 * @param checkStrictly
 * @param primaryKey
 * @returns 是否全部选中
 */
const getCompatibleAllSelected = (
  selected,
  dataSource,
  usableKeys,
  checkStrictly,
  primaryKey
) => {
  if (!usableKeys.length) {
    return false
  }
  // 当前模式下已选中的项
  const currentSelected = selected.filter((item) => usableKeys.includes(item))
  // 获取有效选中（父子模式或非父子模式）
  const validSelected =
    checkStrictly !== false
      ? currentSelected // 非父子模式选中项
      : completedKeys(dataSource, currentSelected, primaryKey) // 父子模式选中项
  // 有效选中项数量等于可执行项数量则全部选中子元素
  return validSelected.length === usableKeys.length
}

export {
  hasSelectedKey,
  getTreeKeys,
  deleteTreeItem,
  isAllSelected,
  getUISelected,
  getOutputData,
  completedKeys,
  getCompatibleAllSelected,
}
