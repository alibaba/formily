import * as React from 'react'
import { isFn, isArr } from '@formily/shared'

type IFilterOption = boolean | ((option: any, keyword: string) => boolean)

function includes(test: React.ReactNode, search: string) {
  return toArray(test).join('').toUpperCase().includes(search)
}

function includesOption(option: any, search: string) {
  const searched = new Set()
  const _includesOption = (option: any) => {
    const keys = Object.keys(option || {})
    return keys.some((key) => {
      if (key === '__level') {
        return false
      }
      const value = option[key]
      if (React.isValidElement(value)) return false
      if (key !== 'children' && !searched.has(value)) {
        if (typeof value === 'object') {
          searched.add(value)
          return _includesOption(value)
        }
        return includes(value, search)
      }
      return false
    })
  }
  return _includesOption(option)
}

function toArray<T>(value: T | T[]): T[] {
  if (isArr(value)) {
    return value
  }
  return value !== undefined ? [value] : []
}

const useFilterOptions = (
  options: any[],
  searchValue?: string | string[],
  filterOption?: IFilterOption,
  checkStrictly?: boolean
) =>
  React.useMemo(() => {
    if (!searchValue || filterOption === false) {
      return options
    }
    const filterFunc = isFn(filterOption)
      ? filterOption
      : (value: any, option: any) => includesOption(option, value.toUpperCase())

    const doFilter = (arr: any[]) => {
      const filterArr: any[] = []
      arr?.forEach((item) => {
        if (item?.children?.length) {
          const filterChildren = doFilter(item.children)
          if (filterChildren.length) {
            filterArr.push({ ...item, children: filterChildren })
          } else if (filterFunc(searchValue, item) && checkStrictly !== false) {
            // 父子关系启用时，没有可用子元素，不添加父元素
            filterArr.push({ ...item, children: [] })
          }
        } else if (filterFunc(searchValue, item)) {
          filterArr.push(item)
        }
      })
      return filterArr
    }

    return doFilter(options)
  }, [options, searchValue, filterOption])

export { useFilterOptions }
